import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";
import routes from "./routes/routes";
import { HttpException } from "./utils";
import { Server } from "socket.io";
import chatsHandlers from "./handlers/chatsHandlers";
import messagesHandlers from "./handlers/messagesHandlers";
import socketVerficationMiddleware from "./middlewares/socket.middleware";
import { receiveSessionKeyHandler } from "./handlers/sessionsHandler";
import { getKeys } from "./utils/encryption/pgp";
import options from "./cert"

const { handleCreateChat } = chatsHandlers;
const { receiveMessageHandler } = messagesHandlers;

dotenv.config();

const app = express();
/**
 * App Configuration
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

/**
 * Server Configuration
 */

const httpServer = https.createServer(options, app);
const port = process.env.PORT;
const socketIO = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const keys = getKeys();

/**
 * Socket middlware
 */
socketIO.use(socketVerficationMiddleware);

socketIO.on("connection", (socket) => {
  if (socket.handshake.auth.chatId) {
    socket.join(String(socket.handshake.auth.chatId));
  }
  socket.on("createChat", handleCreateChat.bind(socket));
  socket.on(
    "send message",
    receiveMessageHandler.bind({ socket, io: socketIO })
  );

  socket.emit("getPublicKey", keys.publicKey);

  socket.on("sendSessionKey", receiveSessionKeyHandler.bind(socket));
});

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

/**
 * Error handling
 */
app.use(
  (
    err: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err && err.name === "UnauthorizedError") {
      return res.status(401).json({
        status: "error",
        error: {
          message: "missing authorization credentials",
        },
      });
      // @ts-ignore
    } else if (err && err.errorCode) {
      // @ts-ignore
      res.status(err.errorCode).json(err.message);
    } else if (err) {
      res.status(500).json(err.message);
    }
  }
);

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

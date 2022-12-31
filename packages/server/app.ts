import express from "express";
import dotenv from "dotenv";
const cors = require("cors");

dotenv.config();

const app = express();
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
  },
});
app.use(cors());
const port = process.env.PORT;

socketIO.on("connection", (socket: any) => {
  console.log("client connected: ", socket.id);
  socket.emit("chat message", "Hiiii");
  socket.join("clock-room");

  socket.on("receive", (data: any) => {
    socket.broadcast.emit("receive", `Received ${data}`);
  });

  socket.on("disconnect", (reason: any) => {
    console.log(reason);
  });
});
setInterval(() => {
  socketIO.to("clock-room").emit("time", new Date());
}, 1000);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

http.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

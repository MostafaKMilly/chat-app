import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import prisma from "../db";

export const socketVerficationMiddleware = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError) => void
) => {
  const userId = Number(socket.handshake.query.userId);
  if (userId) {
    const user = await prisma.user.findMany({
      where: {
        id: userId,
      },
    });
    if (user) {
      return next();
    } else {
      return next(new Error("Invalid user"));
    }
  }
  next();
};

export default socketVerficationMiddleware;

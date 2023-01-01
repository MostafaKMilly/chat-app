import { Prisma } from "@prisma/client";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import prisma from "../db";

async function receiveMessageHandler(
  payload: { chatId: number; message: string },
  socket: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
    // @ts-ignore
  > = this
) {
  const userId = Number(socket.handshake.auth.userId as string);
  const newMessage = await prisma.message.create({
    data: {
      userId: userId,
      chatId: payload.chatId,
      content: payload.message,
    },
  });
  socket.emit("messagesList", newMessage);
}

export default {
  receiveMessageHandler,
};

import { Prisma } from "@prisma/client";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import prisma from "../db";

async function receiveMessageHandler(payload: {
  chatId: number;
  message: string;
}) {
  // @ts-ignore
  const { socket, io } = this;
  const userId = Number(socket.handshake.auth.userId as string);
  const newMessage = await prisma.message.create({
    data: {
      userId: userId,
      chatId: payload.chatId,
      content: payload.message,
    },
  });
  io.in(payload.chatId.toString()).emit("messagesList", newMessage);
}

export default {
  receiveMessageHandler,
};

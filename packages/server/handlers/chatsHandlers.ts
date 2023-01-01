import { Prisma } from "@prisma/client";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import prisma from "../db";

async function handleCreateChat(payload: { recipientId: number }) {
  const socket: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
    // @ts-ignore
  > = this;
  const userId = Number(socket.handshake.query.userId as string);

  const newChat = await prisma.chat.create({
    data: {
      messages: [] as Prisma.chatCreateInput["messages"],
      users: {
        createMany: {
          data: [
            {
              userId: userId,
            },
            {
              userId: payload.recipientId,
            },
          ],
        },
      },
    },
  });
  socket.emit("chatList", newChat);
}

export default {
  handleCreateChat,
};

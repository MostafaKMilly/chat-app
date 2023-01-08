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
  const userId = Number(socket.handshake.auth.userId as string);

  const newChat = await prisma.chat.create({
    data: {
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
    select: {
      users: {
        where: {
          userId: payload.recipientId,
        },
        include: {
          user: true,
        },
      },
    },
  });
  socket.join(newChat.users[0].chatId.toString());
  socket.emit("chatList", newChat);
}

export default {
  handleCreateChat,
};

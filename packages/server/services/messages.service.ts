import prisma from "../db";

export const getMessages = async (chatId: number, userId: number) => {
  const chats = await prisma.message.findMany({
    where: {
      chatId: chatId,
      chat: {
        users: {
          some: {
            userId,
          },
        },
      },
    },
  });

  return chats;
};

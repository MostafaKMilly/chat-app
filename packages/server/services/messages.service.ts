import prisma from "../db";

export const getMessages = async (chatId: number) => {
  const chats = await prisma.message.findMany({
    where: {
      chatId: chatId,
    },
  });

  return chats;
};

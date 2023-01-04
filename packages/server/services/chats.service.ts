import prisma from "../db";

export const getChats = async (userId: number) => {
  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          userId: userId,
        },
      },
    },
    select: {
      id: true,
      users: {
        select: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              id: true,
              phone: true,
            },
          },
        },
        where: {
          userId: {
            not: {
              equals: userId,
            },
          },
        },
      },
    },
  });

  return chats;
};

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      firstName: true,
      lastName: true,
      id: true,
      phone: true,
    },
  });
  return users;
};

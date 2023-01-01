import prisma from "../db";
import { HttpException } from "../utils";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token";
import { Prisma } from "@prisma/client";

const checkUser = async (phone: string) => {
  const user = await prisma.user.findUnique({
    where: {
      phone,
    },
  });

  if (user) {
    throw new HttpException(422, {
      error: {
        ...(user ? { message: "has already been taken" } : {}),
      },
    });
  }
};

export const registerUser = async (
  requestBody: Prisma.userCreateInput
): Promise<Prisma.userCreateInput & { token: string }> => {
  const phone = requestBody.phone?.trim();
  const password = requestBody.password?.trim()!;

  if (!phone) {
    throw new HttpException(422, {
      error: {
        message: "can't be empty",
      },
    });
  }
  await checkUser(phone);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { ...requestBody, password: hashedPassword },
  });

  return {
    ...user,
    token: generateToken(user),
  };
};

export const login = async (userPayload: Prisma.userCreateInput) => {
  const phone = userPayload.phone?.trim();
  const password = userPayload.password?.trim();

  if (!phone) {
    throw new HttpException(422, { error: { message: "can't be blank" } });
  }

  if (!password) {
    throw new HttpException(422, { error: { message: "can't be blank" } });
  }

  const user = await prisma.user.findUnique({
    where: {
      phone,
    },
  });

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return {
        ...user,
        token: generateToken(user),
      };
    }
  }

  throw new HttpException(403, {
    error: {
      message: "phone or password is invalid",
    },
  });
};

export const getCurrentUser = async (phone: string) => {
  const user = (await prisma.user.findUnique({
    where: {
      phone,
    },
  })) as Prisma.userCreateInput;

  if (!user) {
    throw new HttpException(404, {
      error: {
        message: "user not found",
      },
    });
  }
  
  return {
    ...user,
    token: generateToken(user),
  };
};

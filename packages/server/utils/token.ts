import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";

const generateToken = (user: Partial<Prisma.userCreateInput>): string =>
  jwt.sign(user, process.env.JWT_SECRET || "SECRET_TOKEN", {
    expiresIn: "60d",
  });

export default generateToken;

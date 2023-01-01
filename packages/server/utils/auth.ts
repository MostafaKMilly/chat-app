import { Request } from "express";
import { expressjwt as jwt } from "express-jwt";

const getTokenFromHeaders = (req: Request): string | undefined => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return undefined;
};

const auth = {
  required: jwt({
    secret: process.env.JWT_SECRET || "SECRET_TOKEN",
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"],
  }),
  optional: jwt({
    secret: process.env.JWT_SECRET || "SECRET_TOKEN",
    credentialsRequired: false,
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"],
  }),
};

export default auth;

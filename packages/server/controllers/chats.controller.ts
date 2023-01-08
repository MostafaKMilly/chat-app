import { NextFunction, Request, Response, Router } from "express";
import { getChats, getUsers } from "../services/chats.service";
import { auth } from "../utils";
import { Request as ExpressJwtRequest } from "express-jwt";

const router = Router();

router.get(
  "/chats",
  auth.required,
  async (req: ExpressJwtRequest, res: Response, next: NextFunction) => {
    try {
      const chats = await getChats(req.auth?.id);
      res.json(chats);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/chats/users",
  auth.required,
  async (req: ExpressJwtRequest, res: Response, next: NextFunction) => {
    try {
      const users = await getUsers(req.auth?.id);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

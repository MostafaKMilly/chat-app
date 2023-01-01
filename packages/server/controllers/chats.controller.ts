import { NextFunction, Request, Response, Router } from "express";
import { getChats } from "../services/chats.service";
import { auth } from "../utils";

const router = Router();

router.get(
  "/chats",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chats = await getChats(req.body.userId);
      res.json(chats);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

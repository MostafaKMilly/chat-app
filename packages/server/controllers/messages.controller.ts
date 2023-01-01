import { NextFunction, Request, Response, Router } from "express";
import { getMessages } from "../services/messages.service";
import { auth } from "../utils";

const router = Router();

router.get(
  "/messages",
  auth.required,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = await getMessages(req.body.chatId);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

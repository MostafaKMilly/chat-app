import { NextFunction, Request, Response, Router } from "express";
import { getMessages } from "../services/messages.service";

const router = Router();

router.post(
  "/messages",
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

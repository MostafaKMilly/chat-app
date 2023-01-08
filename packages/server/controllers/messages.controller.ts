import { NextFunction, Request, Response, Router } from "express";
import { getMessages } from "../services/messages.service";
import { auth } from "../utils";
import { Request as ExpressJwtRequest } from "express-jwt";

const router = Router();

router.post(
  "/messages",
  auth.required,
  async (req: ExpressJwtRequest, res: Response, next: NextFunction) => {
    try {
      const messages = await getMessages(req.body.chatId, req.auth?.id);
      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
);

export default router;

import { NextFunction, Request, Response, Router } from "express";
import { getChats } from "../services/chats.service";

const router = Router();

router.post(
  "/chats",
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

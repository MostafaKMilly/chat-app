import { NextFunction, Request, Response, Router } from "express";
import auth from "../utils/auth";
import { registerUser, getCurrentUser, login } from "../services/auth.service";
import { Request as ExpressJwtRequest } from "express-jwt";

const router = Router();

router.post(
  "/auth/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await login(req.body.user);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/auth/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await registerUser(req.body.user);
      res.json({ user });
    } catch (error) {
      
      next(error);
    }
  }
);

router.get(
  "/user",
  auth.required,
  async (req: ExpressJwtRequest, res: Response, next: NextFunction) => {
    try {
      const user = await getCurrentUser(req.auth?.phone as string);
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

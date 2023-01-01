import { Router } from "express";
import controllers from "../controllers";
const {authController, chatsController, messagesController} = controllers;

const api = Router().use(authController, chatsController, messagesController);

export default Router().use("/api", api);

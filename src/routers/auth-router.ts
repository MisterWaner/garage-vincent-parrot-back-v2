import { Router } from "express";
import { AuthController } from "../controllers/auth-ctrls.js";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

export default authRouter;


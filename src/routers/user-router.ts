import { Router } from "express";
import { UserController } from "../controllers/user-ctrls.js";

const userRouter = Router();
const userController = new UserController();
import { Router } from "express";
import { UserController } from "../controllers/user-ctrls.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/admin", userController.createAdminUser);
userRouter.post("/employee", userController.createEmployeeUser);
userRouter.get("/admin", userController.getAllAdmins);
userRouter.get("/employee", userController.getAllEmployees);
userRouter.get("/", userController.getAllUsers);


export default userRouter;
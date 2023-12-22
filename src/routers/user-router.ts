import { Router } from "express";
import { UserController } from "../controllers/user-ctrls.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/admin", userController.createAdminUser);
userRouter.post("/employee", userController.createEmployeeUser);
userRouter.get("/admin", userController.getAllAdmins);
userRouter.get("/employee", userController.getAllEmployees);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/admin/:id", userController.getAdminById);
userRouter.get("/employee/:id", userController.getEmployeeById);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
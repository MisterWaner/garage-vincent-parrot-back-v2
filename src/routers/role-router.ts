import { Router } from "express";
import { RoleController } from "../controllers/role-ctrls.js";

const roleRouter: Router = Router();
const roleController = new RoleController();

roleRouter.post("/", roleController.createRole);
roleRouter.get("/", roleController.getAllRoles);
roleRouter.get("/:id", roleController.getRoleById);
roleRouter.put("/:id", roleController.updateRole);
roleRouter.delete("/:id", roleController.deleteRole);

export default roleRouter;
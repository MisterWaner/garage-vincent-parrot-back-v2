/* Imports */
import express, { Request, Response } from "express";
import { config } from "dotenv";

config();

/* App */
const app = express();
const port = process.env.PORT || 3001;

/* Middlewares */
app.use(express.json());

/* Routes */
import roleRouter from "./routers/role-router.js";
import userRouter from "./routers/user-router.js";
import authRouter from "./routers/auth-router.js";

app.get("/", (req: Request, res: Response) => {
    res.send("API démarée et fonctionnelle");
});

app.use("/roles", roleRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

/* Server */
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

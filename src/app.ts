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

app.get("/", (req: Request, res: Response) => {
    res.send("API démarée et fonctionnelle");
});

app.use("/roles", roleRouter);

/* Server */
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

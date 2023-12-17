import express, { Request, Response } from "express";
import { config } from "dotenv";
import { log } from "console";

config();

const app = express();
const port = process.env.PORT || 3001;


app.get("/", (req: Request, res: Response) => {
    res.send("API démarée et fonctionnelle");
});


app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
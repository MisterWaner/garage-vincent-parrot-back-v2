import { Request, Response } from "express";
import { authenticateUser } from "../lib/utils/decryptPassword.js";
import { generateToken } from "../lib/utils/generateToken.js";

export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    error: "L'email et le mot de passe sont obligatoires.",
                });
            }

            const user = await authenticateUser(email, password);
            if (!user) {
                return res.status(401).json({
                    error: "L'email ou le mot de passe est incorrect.",
                });
            }

            const token = generateToken(user);
            console.log(token);

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 3600000,
            });
            return res.status(200).json({
                id: user.id,
                roleId: user.roleId,
                token: token,
            });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "Erreur lors de la connexion." });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                expires: new Date(0),
            });

            return res.status(200).json({ message: "Déconnexion réussie." });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "Erreur lors de la déconnexion." });
        }
    }
}

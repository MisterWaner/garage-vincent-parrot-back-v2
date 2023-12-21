import { Request, Response } from "express";
import { encryptPassword } from "../lib/utils/encryptPassword.js";
import { generateEmailAddress } from "../lib/utils/generateEmailAddress.js";
import { generateTemporaryPassword } from "../lib/utils/generateTemporaryPassword.js";
import { prisma } from "../lib/prisma.js";

export class UserController {
    async createAdminUser(req: Request, res: Response) {
        try {
            const { email, password, confirmPassword } = req.body;
            const roleId = 1;

            const admin = await prisma.user.findFirst({
                where: { email: email, roleId: roleId },
            });

            if (admin) {
                return res.status(409).json({
                    error: "Un administrateur avec cet email existe déjà",
                });
            }

            if (!email || !password || !confirmPassword) {
                return res
                    .status(400)
                    .json({ error: "Des données sont manquantes" });
            }

            if (password !== confirmPassword) {
                return res
                    .status(400)
                    .json({ error: "Les mots de passe ne correspondent pas" });
            }

            const hashedPassword = await encryptPassword(password);

            const newAdmin = await prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                    roleId: roleId,
                },
            });

            return res.status(201).json({
                message: "Administrateur créé avec succès",
                data: newAdmin,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erreur lors de la création de l'administrateur",
            });
        }
    }

    async createEmployeeUser(req: Request, res: Response) {
        try {
            const { firsname, lastname, service } = req.body;

            const roleId = 2;

            const employee = await prisma.user.findUnique({
                where: {
                    email: generateEmailAddress(firsname, lastname),
                    roleId: roleId,
                },
            });

            if (employee) {
                return res
                    .status(409)
                    .json({ error: "Un employé avec cet email existe déjà" });
            }

            if (!firsname || !lastname || !service) {
                return res
                    .status(400)
                    .json({ error: "Des données sont manquantes" });
            }

            const generatedEmail = generateEmailAddress(firsname, lastname);

            const temporaryPassword = generateTemporaryPassword(20);

            const hashedPassword = await encryptPassword(temporaryPassword);

            const newEmployee = await prisma.user.create({
                data: {
                    firstName: firsname,
                    lastName: lastname,
                    email: generatedEmail,
                    password: hashedPassword,
                    roleId: roleId,
                    service: service,
                }
            })

            return res.status(201).json({
                message: "Employé créé avec succès",
                data: newEmployee,
                password: temporaryPassword,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erreur lors de la création de l'employé",
            });
        }
    }

    async getAllAdmins(req: Request, res: Response) {
        try {
            const admins = await prisma.user.findMany({
                where: { roleId: 1 }, orderBy: { email: "asc" },
            });
            
            return res.status(200).json({
                message: "Liste des administrateurs",
                data: admins,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erreur lors de la récupération des administrateurs",
            });
        }
    }

    async getAllEmployees(req: Request, res: Response) {
        try {
            const employees = await prisma.user.findMany({
                where: { roleId: 2 }, orderBy: { email: "asc" },
            });
            
            return res.status(200).json({
                message: "Liste des employés",
                data: employees,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erreur lors de la récupération des employés",
            });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({
                orderBy: { email: "asc", roleId: "asc" },
            });
            
            return res.status(200).json({
                message: "Liste des utilisateurs",
                data: users,
            });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: "Erreur lors de la récupération des utilisateurs",
            });
        }
    }
}

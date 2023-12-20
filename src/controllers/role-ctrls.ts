import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export class RoleController {
    async createRole(req: Request, res: Response) {
        try {
            const { name }: { name: string } = req.body;
            if (!name) {
                return res
                    .status(400)
                    .json({ error: "Le nom du rôle est obligatoire" });
            }

            const role = await prisma.role.findUnique({
                where: { name: name },
            });
            if (role) {
                return res.status(409).json({ error: "Ce rôle existe déjà" });
            }

            const newRole = await prisma.role.create({
                data: { name: name },
            });
            return res
                .status(201)
                .json({ message: "Rôle créé avec succès", data: newRole });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "Erreur lors de la création" });
        }
    }

    async getAllRoles(req: Request, res: Response) {
        try {
            const roles = await prisma.role.findMany({
                orderBy: { id: "asc" },
            });
            return res.status(200).json(roles);
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "Erreur lors de la récupération" });
        }
    }

    async getRoleById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const role = await prisma.role.findUnique({
                where: { id: Number(id) },
            });

            if (!role) {
                return res.status(404).json({ error: "Ce rôle n'existe pas" });
            }

            return res.status(200).json(role);
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "Erreur lors de la récupération" });
        }
    }

    async updateRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name }: { name: string } = req.body;

            if (!name) {
                return res
                    .status(400)
                    .json({ error: "Le nom du rôle est obligatoire" });
            }

            const role = await prisma.role.findUnique({
                where: { id: Number(id) },
            });

            if (!role) {
                return res.status(404).json({ error: "Ce rôle n'existe pas" });
            }

            const updatedRole = await prisma.role.update({
                where: { id: Number(id) },
                data: { name: name },
            });

            return res
                .status(200)
                .json({ message: "Rôle modifié avec succès", data: updatedRole });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "Erreur lors de la modification" });
        }
    }

    async deleteRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            const role = await prisma.role.findUnique({
                where: { id: Number(id) },
            });

            if (!role) {
                return res.status(404).json({ error: "Ce rôle n'existe pas" });
            }

            await prisma.role.delete({
                where: { id: Number(id) },
            });

            return res.status(200).json({ message: "Rôle supprimé avec succès", data: role });
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ error: "Erreur lors de la suppression" });
        }
    }
}

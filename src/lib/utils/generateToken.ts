import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export async function generateToken(user: any) {
    const maxAge: number = 3600000; // 1 hour
    const secret: string = process.env.JWT_SECRET || "";

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            roleId: user.roleId,
        },
        secret,
        { expiresIn: maxAge }
    );

    return token;
}



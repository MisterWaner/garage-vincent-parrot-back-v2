import bcrypt from "bcrypt";
import { config } from "dotenv";

config();

export async function encryptPassword(password: string) {
    const salt: string = process.env.BCRYPT_SALT_ROUND as string;
    const hashPassword: string = await bcrypt.hash(password, parseInt(salt));

    return hashPassword;
}

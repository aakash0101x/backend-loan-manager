import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecret"; // move to .env later

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};

export const generateToken = (userId: number, role: string) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "1d" });
};

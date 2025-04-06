// src/controllers/auth.controller.ts

import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/User";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    const existing = await userRepo.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await hash(password, 10);
    const newUser = userRepo.create({ name, email, password: hashedPassword, role });

    await userRepo.save(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in .env");
    }
    const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: "1h" });

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

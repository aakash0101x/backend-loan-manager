import { UserRole } from "../entities/User"; // Adjust path if needed
import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: {
      userId: number;
      role: string;
    };
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        role: UserRole;
      };
    }
  }
}

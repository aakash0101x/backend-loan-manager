import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface JwtPayload {
  userId: number;
  role: string;
}

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRET) as JwtPayload;

      if (!roles.includes(decoded.role)) {
        res.status(403).json({ message: "Forbidden: Insufficient role" });
        return;
      }

      // Attach user to request
      req.user = { userId: decoded.userId, role: decoded.role };
      next(); // ✅ Call next to proceed to the controller
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

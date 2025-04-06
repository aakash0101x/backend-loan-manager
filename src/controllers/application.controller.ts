import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { LoanApplication } from "../entities/LoanApplication";
import { User } from "../entities/User";

// 👇 Extend Express Request type to include "user"
interface AuthRequest extends Request {
  user?: {
    userId: number;
    role: string;
  };
}

export const submitApplication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, amount } = req.body;
    const userRepo = AppDataSource.getRepository(User);
    const appRepo = AppDataSource.getRepository(LoanApplication);

    const user = await userRepo.findOneBy({ id: req.user!.userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const app = appRepo.create({ fullName, email, amount, status: "pending", submittedBy: user });
    await appRepo.save(app);

    res.status(201).json(app);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const getApplications = async (_req: Request, res: Response) => {
  try {
    const apps = await AppDataSource.getRepository(LoanApplication).find({
      relations: ["submittedBy"],
    });
    res.json(apps);
  } catch (err) {
    console.error("Get Error:", err);
    res.status(500).json({ message: "Error fetching applications" });
  }
};

export const updateStatus = async (
  req: AuthRequest,
  res: Response,
  statusFromRoute: "approved" | "rejected" | "verified"
) => {
  const { id } = req.params;

  try {
    const appRepo = AppDataSource.getRepository(LoanApplication);
    const app = await appRepo.findOneBy({ id: parseInt(id) });

    if (!app) return res.status(404).json({ message: "Application not found" });

    app.status = statusFromRoute;
    await appRepo.save(app);

    res.json({ message: "Status updated", status: app.status });
  } catch (err) {
    console.error("Status Update Error:", err);
    res.status(500).json({ message: "Error updating application" });
  }
};


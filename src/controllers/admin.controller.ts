import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/User";

// ✅ Get All Admins
export const getAllAdmins = async (_req: Request, res: Response): Promise<void> => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const admins = await userRepo.findBy({ role: "admin" });
    res.json(admins);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Admin
export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const userRepo = AppDataSource.getRepository(User);
    const admin = await userRepo.findOneBy({ id: parseInt(id) });

    if (!admin || admin.role !== "admin") {
      res.status(404).json({ message: "Admin not found" });
      return;
    }

    await userRepo.remove(admin);
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete admin" });
  }
};

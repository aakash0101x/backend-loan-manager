// src/routes/auth.routes.ts

import { Router, Request, Response } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { authorize } from "../middlewares/authorize";
import { submitApplication } from "../controllers/application.controller";


const router = Router();

// ✅ Typing properly avoids overload issues
router.post("/register", async (req: Request, res: Response) => {
  await registerUser(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
  await loginUser(req, res);
});
router.post("/submit", authorize(["user"]), async (req: Request, res: Response) => {
  await submitApplication(req, res);
});


export default router;

import { Router, Request, Response, NextFunction } from "express";
import {
  submitApplication,
  getApplications,
  updateStatus,
} from "../controllers/application.controller";
import { authorize } from "../middlewares/authorize";

const router = Router();

// 👇 Async handler to satisfy TS void return expectations
const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Routes
router.post(
  "/submit",
  authorize(["verifier", "admin","user"]),
  asyncHandler(submitApplication)
);

router.get(
  "/",
  authorize(["verifier", "admin"]),
  asyncHandler(getApplications)
);

router.put(
  "/verify/:id",
  authorize(["verifier", "admin"]),
  asyncHandler((req:any, res:any) => updateStatus(req, res, "verified"))
);

router.put(
  "/approve/:id",
  authorize(["admin", "verifier"]),
  asyncHandler((req:any, res:any) => updateStatus(req, res, "approved"))
);

router.put(
  "/reject/:id",
  authorize(["admin", "verifier"]),
  asyncHandler((req:any, res:any) => updateStatus(req, res, "rejected"))
);

export default router;

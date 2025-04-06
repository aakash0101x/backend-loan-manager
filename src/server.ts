import express from "express";
import "reflect-metadata";
import { AppDataSource } from "../ormconfig";
import authRoutes from "./routes/auth.routes";
import applicationRoutes from "./routes/application.routes";
import cors from 'cors';
import adminRoutes from "./routes/adminRoutes"
// top of your file
import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(cors({
  origin: process.env.CORS,
  credentials: true,
}));
// Register BEFORE routes
app.use(express.json());

// Then use routes
app.use("/admins", adminRoutes);
app.use("/auth", authRoutes);
app.use("/applications", applicationRoutes);
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Connected to MySQL");

    app.listen(process.env.PORT, () => {
      console.log("🚀 Server is running ");
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection failed:", err);
  });

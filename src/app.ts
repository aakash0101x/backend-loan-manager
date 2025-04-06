import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.get("/", (_req, res) => {
  res.send("🚀 Loan Manager Backend is running!");
});

export default app;
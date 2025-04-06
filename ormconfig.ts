import { DataSource } from "typeorm";
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: parseInt(process.env.PORTSQL || "3306"),
  username: process.env.USERNAMESQL,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: ["src/entities/*.ts"],
});

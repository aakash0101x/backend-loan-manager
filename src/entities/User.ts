import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
 OneToMany } from "typeorm";
import { LoanApplication } from "./LoanApplication"; // ✅ Import the related entity

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: "verifier" })
  role!: "admin" | "verifier";

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  // ✅ Each user can submit multiple loan applications
  @OneToMany(() => LoanApplication, (application) => application.submittedBy)
  applications!: LoanApplication[];
  
}

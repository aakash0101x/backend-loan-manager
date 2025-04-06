import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class LoanApplication {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column()
  email!: string;

  @Column()
  amount!: number;

  @Column()
  status!: "pending" | "approved" | "rejected" | "verified";

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.applications)
  submittedBy!: User;
}
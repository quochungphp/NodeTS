import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  Index,
  PrimaryColumn,
} from "typeorm";
import { UserInterface } from "../interfaces/user.interface";

export const USER_TABLE = "user";

@Entity(USER_TABLE)
export class UserEntity extends BaseEntity implements UserInterface {
  @PrimaryColumn()
  @Generated("uuid")
  id: string;

  @Column({ type: "varchar" })
  fullName: string;

  @Column({ type: "varchar" })
  @Index()
  email: string;

  @Exclude()
  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  status: string;

  @Column({ type: "int" })
  phone: number;

  @Column({ type: "varchar" })
  provider: string;

  @Column({ type: "timestamp", default: "LOCALTIMESTAMP" })
  createdAt: string;

  @Column({ type: "timestamp", default: "LOCALTIMESTAMP" })
  updateAt: string;
}

import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
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
} from 'typeorm';
import { ProductInterface } from '../interfaces/product.interface';

export const PRODUCT_TABLE = "product";

@Entity(PRODUCT_TABLE)
export class ProductEntity extends BaseEntity implements ProductInterface {
  @PrimaryColumn()
  @Generated("uuid")
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "int" })
  price: number;

  @Column({ type: "varchar" })
  brand: string;

  @Column({ type: "varchar" })
  @Column({ type: "varchar" })
  status: string;

  color: string;

  @Column({ type: "varchar" })
  productGroupId: string;

  @Column({ type: "timestamp", default: "LOCALTIMESTAMP" })
  createdAt: string;

  @Column({ type: "timestamp", default: "LOCALTIMESTAMP" })
  updatedAt: string;
}

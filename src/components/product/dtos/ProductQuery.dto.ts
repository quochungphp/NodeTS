import { IsNotEmpty } from "class-validator";

export class ProductQueryDto {
  name: string;

  color: string;

  brand: string;
}

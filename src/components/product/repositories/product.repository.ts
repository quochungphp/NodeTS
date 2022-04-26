import { EntityRepository, getManager, Repository } from "typeorm";
import { ProductEntity } from "./product.entity";

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity>{
  
}
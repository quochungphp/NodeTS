/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-console */
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ProductInterface } from "../interfaces/Product.interface";
import { ProductRepository } from "../repositories/product.repository";
import { ProductEntity, PRODUCT_TABLE } from "../repositories/product.entity";
import { ProductQueryDto } from "../dtos/ProductQuery.dto";

@Service()
export class ProductService {
  @InjectRepository(ProductEntity)
  private productRepository: ProductRepository;

  public async findAllProduct(query: ProductQueryDto, ): Promise<ProductInterface[]> {
    const sqlBuilder = this.productRepository.createQueryBuilder(PRODUCT_TABLE);
    // Just a simple query 
    if (query) {
      sqlBuilder.where(query)
    }

    return sqlBuilder.getMany();
  }
}

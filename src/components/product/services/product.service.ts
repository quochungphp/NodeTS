import { EntityRepository, Repository } from "typeorm";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ProductInterface } from "../interfaces/Product.interface";
import { ProductRepository } from "../repositories/product.repository";
import { ProductEntity } from "../repositories/product.entity";

@Service()
export class ProductService {
  @InjectRepository(ProductEntity)
  private productRepository: ProductRepository;

  public async findAllProduct(): Promise<ProductInterface[]> {
    const Products: ProductInterface[] = await this.productRepository.find();
    return Products;
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { ProductInterface } from '../interfaces/Product.interface';
import { Service } from 'typedi';
import { ProductRepository } from '../repositories/product.repository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ProductEntity } from '../repositories/product.entity';
@Service()
export class ProductService {
  @InjectRepository(ProductEntity)
  private productRepository: ProductRepository;

  public async findAllProduct(): Promise<ProductInterface[]> {
    const Products: ProductInterface[] = await  this.productRepository.find();
    return Products;
  }
}

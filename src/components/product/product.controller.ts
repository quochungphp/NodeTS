import { Controller, Get } from "routing-controllers";
import Container, { Service, Inject } from "typedi";
import { ProductService } from "./services/product.service";

@Controller('/products')
@Service()
export class ProductController {
  @Inject() private readonly productService: ProductService;
  constructor() {
    this.productService = Container.get(ProductService)
  }

  @Get('')
  async getAll() {
    return this.productService.findAllProduct();
  }
}
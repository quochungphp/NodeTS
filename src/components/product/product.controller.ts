import 'reflect-metadata';
import { Authorized, Controller, Get, JsonController } from "routing-controllers";
import { AuthorizedApiKey } from "../../utils/decorators/AuthorizedApiKey";
import Container, { Service, Inject } from "typedi";
import { ProductService } from "./services/product.service";
import { AuthorizedApiKeyException } from "../../utils/exceptions/AuthorizedApiKeyException";

@JsonController('/products')
@Service()
export class ProductController {
  @Inject() private readonly productService: ProductService;
  constructor() {
    this.productService = Container.get(ProductService)
  }
  @Authorized()
  @Get('')
  async getAll(@AuthorizedApiKey({ required: true }) isActive: Boolean) {
    return this.productService.findAllProduct();
  }
}
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import { Authorized, Controller, Get, JsonController, QueryParams } from "routing-controllers";
import Container, { Service, Inject } from "typedi";
import { AuthorizedApiKey } from "../../utils/decorators/AuthorizedApiKey";
import { ProductService } from "./services/product.service";
import { AuthorizedApiKeyException } from "../../utils/exceptions/AuthorizedApiKeyException";
import { ProductQueryDto } from "./dtos/ProductQuery.dto";

@JsonController("/products")
@Service()
export class ProductController {
  @Inject() private readonly productService: ProductService;

  constructor() {
    this.productService = Container.get(ProductService);
  }

  @Authorized()
  @Get("")
  async getAll(
    @QueryParams() query: ProductQueryDto,
    @AuthorizedApiKey({ required: true }) isActive: boolean,
  ) {
    return this.productService.findAllProduct(query);
  }
}

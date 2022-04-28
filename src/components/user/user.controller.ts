import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import Container, { Inject, Service } from 'typedi';
import { Repository, getConnectionManager } from "typeorm";
import { UserService } from "./services/user.service";

@Controller('/users')
@Service()
export class UserController {
  @Inject() private readonly userService: UserService;

  constructor() {
    this.userService = Container.get(UserService);
  }

  @Get('')
  async getAll() {
    const user = await this.userService.findAllUser();
    return user;
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return 'This action returns user #' + id;
  }

  @Post('')
  post(@Body() user: any) {
    return 'Saving user...';
  }

  @Put(':id')
  put(@Param('id') id: number, @Body() user: any) {
    return 'Updating a user...';
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return 'Removing user...';
  }
}

import { Controller, Param, Body, Get, Post, Put, Delete } from 'routing-controllers';
import { Repository, getConnectionManager } from "typeorm";
import UserService from "./services/user.service";

@Controller()
export class UserController {
  public userService = new UserService();


  @Get('/users')
  async getAll() {
    const user = await this.userService.findAllUser();
    return user;
  }

  @Get('/users/:id')
  getOne(@Param('id') id: number) {
    return 'This action returns user #' + id;
  }

  @Post('/users')
  post(@Body() user: any) {
    return 'Saving user...';
  }

  @Put('/users/:id')
  put(@Param('id') id: number, @Body() user: any) {
    return 'Updating a user...';
  }

  @Delete('/users/:id')
  remove(@Param('id') id: number) {
    return 'Removing user...';
  }
}
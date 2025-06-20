import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { user } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    return await this.userService.getUser();
  }

  @Post('create-user')
  async createUser(@Body() dataUser: user) {
    const data = await this.userService.createUser(dataUser);
    return {
      status: 'ok',
      message: 'success',
      data: data,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.userService.delete(id);
      return {
        status: 'ok',
        message: 'success',
      };
    } catch (error) {
      return {
        status: `error ${error} `,
        message: 'failed',
      };
    }
  }
}

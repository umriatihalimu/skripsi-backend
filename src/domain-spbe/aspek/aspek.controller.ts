import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AspekService } from './aspek.service';
import { tb_aspek } from '@prisma/client';

@Controller('aspek')
export class AspekController {
  constructor(private readonly aspekService: AspekService) {}

  @Get()
  async getAspek() {
    return await this.aspekService.getAspek();
  }

  @Post()
  async createAspek(@Body() formAspek: tb_aspek) {
    const data = await this.aspekService.createAspek(formAspek);
    return {
      status: 'ok',
      message: 'success',
      data: data,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.aspekService.delete(id);
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

  @Get(':id')
  async getAspekBydomain(@Param('id') id: string) {
    const data = await this.aspekService.getAspekBydomain(id);
    return data;
  }
}

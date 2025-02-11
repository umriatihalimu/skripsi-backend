import { Controller, Get, Param } from '@nestjs/common';
import { PengujiService } from './penguji.service';

@Controller('penguji')
export class PengujiController {
  constructor(private readonly pengujiService: PengujiService) {}

  @Get()
  async getPenguji() {
    const data = await this.pengujiService.getPenguji();
    return {
      data: data,
      status: 'ok',
      message: 'success',
    };
  }

  @Get('jawab-kuisioner/:id')
  async getKuisioner(@Param('id') id: string) {
    const data = await this.pengujiService.getJawabKuisioner(id);
    return {
      data: data,
      status: 'ok',
      message: 'success',
    };
  }

  @Get('skor/:id')
  async getSkor(@Param('id') id: string) {
    const data = await this.pengujiService.getSkor(id);
    return {
      data: data,
      status: 'ok',
      message: 'success',
    };
  }
}

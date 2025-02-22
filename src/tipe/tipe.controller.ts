import { Controller, Get } from '@nestjs/common';
import { TipeService } from './tipe.service';

@Controller('tipe')
export class TipeController {
  constructor(private readonly tipeService: TipeService) {}

  @Get()
  async getTipe() {
    const data = await this.tipeService.getTipe();
    return {
      data: data,
      status: 'ok',
      message: 'success',
    };
  }
}

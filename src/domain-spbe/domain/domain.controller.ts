import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { tb_domain } from '@prisma/client';
import { DomainService } from './domain.service';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}
  @Get()
  async getDomain() {
    return await this.domainService.getDomain();
  }

  @Post()
  async createDomain(@Body() formDomain: tb_domain) {
    const data = await this.domainService.createDomain(formDomain);
    return {
      status: 'ok',
      message: 'success',
      data: data,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.domainService.delete(id);
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

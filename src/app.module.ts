import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KuisionerController } from './kuisioner/kuisioner.controller';
import { PrismaService } from './prisma.service';
import { IndikatorService } from './domain-spbe/indikator/indikator.service';
import { KuisionerService } from './kuisioner/kuisioner.service';
import { DomainController } from './domain-spbe/domain/domain.controller';
import { DomainService } from './domain-spbe/domain/domain.service';
import { AspekController } from './domain-spbe/aspek/aspek.controller';
import { AspekService } from './domain-spbe/aspek/aspek.service';
import { IndikatorController } from './domain-spbe/indikator/indikator.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    KuisionerController,
    IndikatorController,
    DomainController,
    AspekController,
  ],
  providers: [
    AppService,
    KuisionerService,
    PrismaService,
    IndikatorService,
    DomainService,
    AspekService,
  ],
})
export class AppModule {}

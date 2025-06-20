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
import { PengujiController } from './penguji/penguji.controller';
import { PengujiService } from './penguji/penguji.service';
import { LoginController } from './login/login.controller';
import { TipeController } from './tipe/tipe.controller';
import { TipeService } from './tipe/tipe.service';
import { PertanyaanController } from './pertanyaan/pertanyaan.controller';
import { PertanyaanService } from './pertanyaan/pertanyaan.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    KuisionerController,
    IndikatorController,
    DomainController,
    AspekController,
    PengujiController,
    LoginController,
    TipeController,
    PertanyaanController,
    UserController,
  ],
  providers: [
    AppService,
    KuisionerService,
    PrismaService,
    IndikatorService,
    DomainService,
    AspekService,
    PengujiService,
    TipeService,
    PertanyaanService,
    UserService,
  ],
})
export class AppModule {}

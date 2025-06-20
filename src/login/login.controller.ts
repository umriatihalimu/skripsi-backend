import { Body, Controller, Post } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';
@Controller('login')
export class LoginController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async postLogin(@Body() formLogin: { username: string; password: string }) {
    var token = '';
    var status = '';
    var tipe_user = '';
    const cekData = await this.prisma.user.findFirst({
      where: {
        username: formLogin.username,
      },
    });

    if (cekData) {
      const cekPassword = bcrypt.compareSync(
        formLogin.password,
        cekData.password,
      );
      if (cekPassword) {
        status = 'login_sukses';
        tipe_user = cekData.tipe_user;
        const payload = { username: cekData.username, nama: cekData.nama_user };
        token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' });
      } else {
        status = 'login_gagal';
      }
    } else {
      status = 'login_gagal';
    }
    return {
      status: status,
      token: token,
      user: tipe_user,
    };
  }
}

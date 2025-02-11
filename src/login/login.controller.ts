import { Body, Controller, Post } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Controller('login')
export class LoginController {
  @Post()
  postLogin(@Body() formLogin: { username: string; password: string }) {
    const user = 'user';
    const pass = '123';
    var token = null;
    var status = '';
    if (formLogin.username == user && formLogin.password == pass) {
      status = 'login_berhasil';

      const payload = { nama: 'umi', username: user };
      token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1d' });
    } else {
      status = 'login_gagal';
    }
    return {
      status: status,
      message: 'success',
      token: token,
    };
  }
}

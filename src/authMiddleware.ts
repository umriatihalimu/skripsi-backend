import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    const url = req.url;

    if (url.includes('/login')) {
      next();
    }
    if (url.includes("upload")) {
      next()
    }
    else {
      if (typeof token == 'undefined') {
        res.json({
          status: 'forbidden',
          message: 'akses tidak diizinkan',
        });
      } else {
        try {
          jwt.verify(token, process.env.JWT_KEY);
          next(); // Panggil `next` untuk melanjutkan ke middleware berikutnya atau controller
        } catch (error) {
          res.json({
            status: 'forbidden',
            message: 'token expired',
          });
        }
      }
    }
  }
}

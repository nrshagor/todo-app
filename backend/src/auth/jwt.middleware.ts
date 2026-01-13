import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if (!auth) throw new UnauthorizedException('Token missing');

    const token = auth.split(' ')[1];

    const secret = this.config.get<string>('JWT_SECRET');

    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    try {
      jwt.verify(token, secret);
      next();
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

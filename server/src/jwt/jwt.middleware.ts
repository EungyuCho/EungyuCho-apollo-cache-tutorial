import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from './jwt.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      try {
        const decode = this.jwtService.verify(token.toString());
        if (typeof decode === 'object' && decode.hasOwnProperty('id')) {
          const { user } = await this.userService.findById(decode['id']);
          req['user'] = user;
        }
      } catch (e) {}
    }
    next();
  }
}

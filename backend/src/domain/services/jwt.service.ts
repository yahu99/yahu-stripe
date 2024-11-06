import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { IJwtService } from '../interfaces/services/jwt.interface';
import { UserEntity } from '../entities/user.entity';
import { JwtPayloadType } from '../../shared/types/jwt-payload.type';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  private verifyToken(token: string): JwtPayloadType {
    try {
      return this.nestJwtService.verify(token);
    } catch {
      throw new HttpException('Bad token!', HttpStatus.UNAUTHORIZED);
    }
  }

  generateToken(user: UserEntity): string {
    const payload: JwtPayloadType = {
      login: user.login,
      sub: user.id,
    };

    return this.nestJwtService.sign(payload, { expiresIn: '180s' });
  }

  getUserIdFromToken(token: string): number {
    const user = this.verifyToken(token);

    return user.sub;
  }
}

import { UserEntity } from '../../entities/user.entity';

export interface IJwtService {
  generateToken(user: UserEntity): string;
  getUserIdFromToken(token: string): number;
}

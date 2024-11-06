import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/entities/user.entity';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  login: string;


  static construct(entity: UserEntity): UserDto {
    const it = new UserDto();

    it.id = entity.id;
    it.name = entity.name;
    it.login = entity.login;

    return it;
  }
}

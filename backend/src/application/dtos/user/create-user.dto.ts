import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../domain/entities/user.entity';
import { aesEncrypt } from '../../../domain/utils/aes';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;


  @ApiProperty()
  @IsNotEmpty({ message: 'login must not be empty' })
  login: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'password must not be empty' })
  password: string;

  static toEntity(dto: CreateUserDto, key: string): UserEntity {
    const it = new UserEntity();

    it.name = dto.name;
    it.login = dto.login;
    it.password = aesEncrypt(dto.password, key);

    return it;
  }
}

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from '../../shared/injection-tokens';
import { IUserRepository } from '../interfaces/repositories/user.interface';
import { IUserService } from '../interfaces/services/user.interface';
import { UserDto } from '../../application/dtos/user/user.dto';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../../application/dtos/user/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService implements IUserService {
  private aesKey: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {
    this.aesKey = this.configService.get<string>('AES_KEY');
  }

  async getAll(): Promise<UserDto[]> {
    const userEntities = await this.userRepository.getAllActiveUsers();

    return userEntities.map((el) => UserDto.construct(el));
  }

  async getById(userId: number): Promise<UserDto> {
    const userEntity = await this.userRepository.getActualById(userId);

    if (!userEntity) throw new NotFoundException('User not found!');

    return UserDto.construct(userEntity);
  }

  getUserEntityByLogin(login: string, isActive?: boolean): Promise<UserEntity> {
    return this.userRepository.getByLogin(login, isActive);
  }

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const checkExistSameLogin = await this.userRepository.getByLogin(dto.login);

    if (checkExistSameLogin)
      throw new BadRequestException('User with same login name already exist!');

    const savedUser = await this.userRepository.createUser(
      CreateUserDto.toEntity(dto, this.aesKey),
    );

    return UserDto.construct(savedUser);
  }


}

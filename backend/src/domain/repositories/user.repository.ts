import { Repository, DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/repositories/user.interface';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  getAllActiveUsers(): Promise<UserEntity[]> {
    return this.find({
      where: { isActive: true },
    });
  }

  getActualById(id: number): Promise<UserEntity> {
    return this.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  }

  getByLogin(login: string, isActive?: boolean): Promise<UserEntity> {
    return this.findOne({
      where: {
        login,
        isActive,
      },
    });
  }

  createUser(entity: UserEntity): Promise<UserEntity> {
    return this.save(entity);
  }
}

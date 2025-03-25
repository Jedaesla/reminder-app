import { UserModelInfrastructure } from '../models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserApplicationRepository } from 'src/Auth/application/persistence/repositories/user.repository';
import { CreateUserApplicationDto } from 'src/Auth/application/dto/create-user.dto';
import { UpdateUserApplicationDto } from 'src/Auth/application/dto/update-user.dto';

@Injectable()
export class UserRepository
  implements UserApplicationRepository<UserModelInfrastructure>
{
  constructor(
    @InjectRepository(UserModelInfrastructure)
    readonly repository: Repository<UserModelInfrastructure>,
  ) {}

  async create(
    user: CreateUserApplicationDto,
  ): Promise<UserModelInfrastructure> {
    const dataUser = this.mapApplicationDtoToUserModel(user);
    const data = await this.findByEmail(dataUser.email);
    if (data) {
      throw new Error('The email already has a registered account');
    }
    return this.repository.save(dataUser);
  }

  update(
    id: string,
    user: UpdateUserApplicationDto,
  ): Promise<UserModelInfrastructure> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<UserModelInfrastructure | null> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<UserModelInfrastructure[]> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<UserModelInfrastructure | null> {
    return await this.repository.findOne({
      where: {
        email,
        isActive: true,
      },
    });
  }

  private mapApplicationDtoToUserModel(
    data: CreateUserApplicationDto,
  ): UserModelInfrastructure {
    const user = new UserModelInfrastructure();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    return user;
  }
}

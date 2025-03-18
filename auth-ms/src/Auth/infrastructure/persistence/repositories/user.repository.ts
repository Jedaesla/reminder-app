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

  // async update(
  //   id: string,
  //   reminder: UpdateReminderApplicationDto,
  // ): Promise<ReminderModelInfrastructure> {
  //   const reminderResult = await this.findById(id);
  //   if (!reminderResult) {
  //     throw new Error('Reminder not found');
  //   }
  //   const dataUpdate = {
  //     ...reminderResult,
  //     ...reminder,
  //     updatedAt: new Date(),
  //   };

  //   return await this.repository.save(dataUpdate);
  // }

  // async delete(id: string): Promise<boolean> {
  //   const reminderUpdate = await this.repository.update(id, {
  //     available: false,
  //   });
  //   if (reminderUpdate.affected === 0) {
  //     throw new Error('Reminder not found');
  //   }
  //   return true;
  // }

  // async findById(id: string): Promise<ReminderModelInfrastructure | null> {
  //   return await this.repository.findOne({
  //     where: {
  //       id,
  //       available: true,
  //     },
  //   });
  // }

  // async findAll(): Promise<ReminderModelInfrastructure[]> {
  //   return this.repository.find({ where: { available: true } });
  // }

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

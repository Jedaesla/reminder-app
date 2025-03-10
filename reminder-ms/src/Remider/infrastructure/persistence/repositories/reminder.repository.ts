import { ReminderApplicationRepository } from 'src/Remider/application/persistence/repositories/reminder.repository';
import { ReminderModelInfrastructure } from '../models/reminder.model';
import { CreateReminderApplicationDto } from 'src/Remider/application/dto/create-user.dto';
import { UpdateReminderApplicationDto } from 'src/Remider/application/dto/update-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReminderRepository
  implements ReminderApplicationRepository<ReminderModelInfrastructure>
{
  constructor(
    @InjectRepository(ReminderModelInfrastructure)
    readonly repository: Repository<ReminderModelInfrastructure>,
  ) {}

  async create(
    reminder: CreateReminderApplicationDto,
  ): Promise<ReminderModelInfrastructure> {
    const data = this.mapApplicationDtoToUserModel(reminder);
    return this.repository.save(data);
  }

  async update(
    reminder: UpdateReminderApplicationDto,
  ): Promise<ReminderModelInfrastructure> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<ReminderModelInfrastructure | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<ReminderModelInfrastructure[]> {
    return this.repository.find();
  }

  private mapApplicationDtoToUserModel(
    data: CreateReminderApplicationDto,
  ): ReminderModelInfrastructure {
    const reminder = new ReminderModelInfrastructure();
    reminder.title = data.title;
    reminder.description = data.description;
    reminder.reminderDateTime = data.reminderDateTime;
    reminder.isCompleted = data.isCompleted;
    return reminder;
  }
}

import { ReminderApplicationRepository } from 'src/Remider/application/persistence/repositories/reminder.repository';
import { ReminderModelInfrastructure } from '../models/reminder.model';
import { CreateReminderApplicationDto } from 'src/Remider/application/dto/create-reminder.dto';
import { UpdateReminderApplicationDto } from 'src/Remider/application/dto/update-reminder.dto';
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
    id: string,
    reminder: UpdateReminderApplicationDto,
  ): Promise<ReminderModelInfrastructure> {
    const reminderResult = await this.findById(id);
    if (!reminderResult) {
      throw new Error('Reminder not found');
    }
    const dataUpdate = {
      ...reminderResult,
      ...reminder,
      updatedAt: new Date(),
    };

    return await this.repository.save(dataUpdate);
  }

  async delete(id: string): Promise<boolean> {
    const reminderUpdate = await this.repository.update(id, {
      available: false,
    });
    if (reminderUpdate.affected === 0) {
      throw new Error('Reminder not found');
    }
    return true;
  }

  async findById(id: string): Promise<ReminderModelInfrastructure | null> {
    return await this.repository.findOne({
      where: {
        id,
        available: true,
      },
    });
  }

  async findAll(): Promise<ReminderModelInfrastructure[]> {
    return this.repository.find({ where: { available: true } });
  }

  private mapApplicationDtoToUserModel(
    data: CreateReminderApplicationDto,
  ): ReminderModelInfrastructure {
    const reminder = new ReminderModelInfrastructure();
    reminder.userId = data.userId;
    reminder.title = data.title;
    reminder.description = data.description;
    reminder.reminderDateTime = data.reminderDateTime;
    reminder.isCompleted = data.isCompleted;
    return reminder;
  }
}

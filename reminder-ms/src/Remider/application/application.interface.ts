import { UuidDomainService } from '../domain/services/uuid.service';
import { ReminderApplicationDto } from './dto/reminder.dto';
import { UpdateReminderApplicationDto } from './dto/update-reminder.dto';
export abstract class ApplicationInterface {
  abstract createReminder(
    title: string,
    description: string,
    reminderDateTime: string,
    isCompleted: boolean,
    uuidService: UuidDomainService,
  ): Promise<ReminderApplicationDto>;
  abstract findReminderById(id: string): Promise<ReminderApplicationDto>;
  abstract findAllReminders(): Promise<ReminderApplicationDto[]>;
  abstract updateReminder(
    id: string,
    reminder: UpdateReminderApplicationDto,
  ): Promise<ReminderApplicationDto>;
  abstract deleteRemider(id: string): Promise<boolean>;
}

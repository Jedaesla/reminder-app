import { UuidDomainService } from '../domain/services/uuid.service';
import { ReminderApplicationDto } from './dto/reminder.dto';
export abstract class ApplicationInterface {
  abstract createReminder(
    title: string,
    description: string,
    reminderDateTime: string,
    isCompleted: boolean,
    uuidService: UuidDomainService,
  ): Promise<ReminderApplicationDto>;
  abstract findReminderById(id: string): Promise<ReminderApplicationDto>;
}

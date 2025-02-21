import { CreateReminderDomainDto } from './dto/create-reminder.dto';
import { ReminderDomainDto } from './dto/reminder.dto';
import { UuidDomainService } from './services/uuid.service';

export abstract class Domain {
  abstract createReminder(
    data: CreateReminderDomainDto,
    uuidService: UuidDomainService,
  ): ReminderDomainDto;
}

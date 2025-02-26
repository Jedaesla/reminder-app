import { Domain } from './domain.interface';
import { CreateReminderDomainDto } from './dto/create-reminder.dto';
import { ReminderDomainDto } from './dto/reminder.dto';
import { ReminderEntity } from './entitites/reminder.entity';
import { InvalidDataException } from './exceptions/invalid-data.exception';
import { UuidDomainService } from './services/uuid.service';

export class DomainController extends Domain {
  createReminder(
    data: CreateReminderDomainDto,
    uuidService: UuidDomainService,
  ): ReminderDomainDto {
    const reminder = new ReminderEntity(uuidService);
    reminder.create(data);

    if (reminder.isValid() === false) {
      throw new InvalidDataException(
        'Invalid reminder data',
        reminder.getErrors(),
      );
    }
    return reminder;
  }
}

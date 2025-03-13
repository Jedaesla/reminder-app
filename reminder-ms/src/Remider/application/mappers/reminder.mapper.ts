import { ReminderApplicationDto } from '../dto/reminder.dto';
import { ReminderModelApplication } from '../persistence/models/reminder.model';

export class ReminderMapApplication {
  static toApplicationDto(
    reminderDto: ReminderModelApplication,
  ): ReminderApplicationDto {
    return {
      id: reminderDto.id,
      title: reminderDto.title,
      description: reminderDto.description,
      reminderDateTime: reminderDto.reminderDateTime,
      isCompleted: reminderDto.isCompleted,
    };
  }
}

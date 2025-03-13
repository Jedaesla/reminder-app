import { ReminderApplicationRepository } from '../persistence/repositories/reminder.repository';
import { ReminderModelApplication } from '../persistence/models/reminder.model';
import { ReminderApplicationDto } from '../dto/reminder.dto';
import { UpdateReminderApplicationDto } from '../dto/update-reminder.dto';
import { ReminderMapApplication } from '../mappers/reminder.mapper';

export class UpdateReminderUseCase {
  constructor(
    private readonly reminderRepository: ReminderApplicationRepository<ReminderModelApplication>,
  ) {}

  async execute(
    id: string,
    reminder: UpdateReminderApplicationDto,
  ): Promise<ReminderApplicationDto> {
    const reminderResult = await this.reminderRepository.update(id, reminder);
    return ReminderMapApplication.toApplicationDto(reminderResult);
  }
}

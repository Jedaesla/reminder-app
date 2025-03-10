import { ReminderApplicationRepository } from '../persistence/repositories/reminder.repository';
import { ReminderModelApplication } from '../persistence/models/reminder.model';
import { ReminderApplicationDto } from '../dto/reminder.dto';

export class FindAllRemindersUseCase {
  constructor(
    private readonly reminderRepository: ReminderApplicationRepository<ReminderModelApplication>,
  ) {}

  async execute(): Promise<ReminderApplicationDto[]> {
    const reminders = await this.reminderRepository.findAll();
    const answer = reminders.map((reminder) =>
      this.mapReminderDtoToApplication(reminder),
    );
    return answer;
  }

  private mapReminderDtoToApplication(
    reminderDto: ReminderModelApplication,
  ): ReminderApplicationDto {
    const reminder = new ReminderApplicationDto();
    reminder.id = reminderDto.id;
    reminder.title = reminderDto.title;
    reminder.description = reminderDto.title;
    reminder.reminderDateTime = reminderDto.description;
    reminder.isCompleted = reminderDto.isCompleted;

    return reminder;
  }
}

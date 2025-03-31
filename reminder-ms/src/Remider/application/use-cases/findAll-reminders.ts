import { ReminderApplicationRepository } from '../persistence/repositories/reminder.repository';
import { ReminderModelApplication } from '../persistence/models/reminder.model';
import { ReminderApplicationDto } from '../dto/reminder.dto';
import { ReminderMapApplication } from '../mappers/reminder.mapper';

export class FindAllRemindersUseCase {
  constructor(
    private readonly reminderRepository: ReminderApplicationRepository<ReminderModelApplication>,
  ) {}

  async execute({
    userId,
  }: {
    userId: string;
  }): Promise<ReminderApplicationDto[]> {
    const reminders = await this.reminderRepository.findAll(userId);
    const answer = reminders.map((reminder) =>
      ReminderMapApplication.toApplicationDto(reminder),
    );
    return answer;
  }
}

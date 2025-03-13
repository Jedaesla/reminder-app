import { ReminderApplicationRepository } from '../persistence/repositories/reminder.repository';
import { ReminderModelApplication } from '../persistence/models/reminder.model';
import { ReminderApplicationDto } from '../dto/reminder.dto';
import { UseCaseException } from '../exceptions/use-case.exception';
import { ReminderMapApplication } from '../mappers/reminder.mapper';

export class FindReminderByIdUseCase {
  constructor(
    private readonly reminderRepository: ReminderApplicationRepository<ReminderModelApplication>,
  ) {}

  async execute(id: string): Promise<ReminderApplicationDto> {
    const reminder = await this.reminderRepository.findById(id);
    if (!reminder) {
      throw new UseCaseException(`User with id ${id} not found`);
    }
    const answer = ReminderMapApplication.toApplicationDto(reminder);
    return answer;
  }
}

import { ReminderApplicationRepository } from '../persistence/repositories/reminder.repository';
import { ReminderModelApplication } from '../persistence/models/reminder.model';
import { ReminderApplicationDto } from '../dto/reminder.dto';
import { UseCaseException } from '../exceptions/use-case.exception';

export class FindReminderByIdUseCase {
  constructor(
    private readonly reminderRepository: ReminderApplicationRepository<ReminderModelApplication>,
  ) {}

  async execute(id: string): Promise<ReminderApplicationDto> {
    const reminder = await this.reminderRepository.findById(id);
    if (!reminder) {
      throw new UseCaseException(`User with id ${id} not found`);
    }
    const answer = this.mapReminderDtoToApplication(reminder);
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

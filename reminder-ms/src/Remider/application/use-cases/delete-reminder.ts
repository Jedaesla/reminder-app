import { ReminderApplicationRepository } from '../persistence/repositories/reminder.repository';
import { ReminderModelApplication } from '../persistence/models/reminder.model';

export class DeleteReminderUseCase {
  constructor(
    private readonly reminderRepository: ReminderApplicationRepository<ReminderModelApplication>,
  ) {}

  async execute(id: string): Promise<boolean> {
    const reminderResult = await this.reminderRepository.delete(id);
    return reminderResult;
  }
}

import { Domain } from '../domain/domain.interface';
import { UuidDomainService } from '../domain/services/uuid.service';
import { ApplicationInterface } from './application.interface';
import { ReminderApplicationDto } from './dto/reminder.dto';
import { ReminderModelApplication } from './persistence/models/reminder.model';
import { ReminderApplicationRepository } from './persistence/repositories/reminder.repository';
import { CreateReminderUseCase } from './use-cases/create-reminder';

export class ApplicationController extends ApplicationInterface {
  constructor(
    private readonly reminderRepository: ReminderApplicationRepository<ReminderModelApplication>,
    private readonly domainController: Domain,
  ) {
    super();
  }
  createReminder(
    title: string,
    description: string,
    reminderDateTime: string,
    isCompleted: boolean,
    uuidService: UuidDomainService,
  ): Promise<ReminderApplicationDto> {
    const useCase = new CreateReminderUseCase(
      this.reminderRepository,
      this.domainController,
      uuidService,
    );
    return useCase.execute({
      title,
      description,
      reminderDateTime,
      isCompleted,
    });
  }
}

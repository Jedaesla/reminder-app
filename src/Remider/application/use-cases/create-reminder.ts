import { ReminderApplicationRepository } from '../persistence/repositories/reminder.repository';
import { ReminderModel } from '../persistence/models/reminder.model';
import { Domain } from '../../domain/domain.interface';
import { UuidDomainService } from '../../domain/services/uuid.service';
import { CreateReminderApplicationDto } from '../dto/create-user.dto';
import { ReminderApplicationDto } from '../dto/reminder.dto';
import { CreateReminderDomainDto } from 'src/Remider/domain/dto/create-reminder.dto';

export class CreateReminderUseCase {
  constructor(
    private readonly reminderRepository: ReminderApplicationRepository<ReminderModel>,
    private readonly domainController: Domain,
    private readonly uuidService: UuidDomainService,
  ) {}

  async execute(
    reminderDto: CreateReminderApplicationDto,
  ): Promise<ReminderApplicationDto> {
    const reminder = this.mapReminderDtoToDomain(reminderDto);
    const data = this.domainController.createReminder(
      reminder,
      this.uuidService,
    );
    const reminderPersistence = this.mapReminderDtoToPersistence(data);
    const remindersDto =
      await this.reminderRepository.create(reminderPersistence);

    const answer = this.mapReminderDtoToApplication(remindersDto);
    return answer;
  }

  private mapReminderDtoToDomain(
    reminderDto: CreateReminderApplicationDto,
  ): CreateReminderDomainDto {
    const reminder = new CreateReminderDomainDto();
    reminder.title = reminderDto.title;
    reminder.description = reminderDto.description;
    reminder.reminderDateTime = reminderDto.reminderDateTime;
    reminder.isCompleted = reminderDto.isCompleted;
    return reminder;
  }

  private mapReminderDtoToPersistence(
    reminderDto: ReminderApplicationDto,
  ): ReminderApplicationDto {
    const reminder = new ReminderApplicationDto();
    reminder.id = reminderDto.id;
    reminder.title = reminderDto.title;
    reminder.description = reminderDto.description;
    reminder.reminderDateTime = reminderDto.reminderDateTime;
    reminder.isCompleted = reminderDto.isCompleted;

    return reminder;
  }

  private mapReminderDtoToApplication(
    reminderDto: ReminderModel,
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

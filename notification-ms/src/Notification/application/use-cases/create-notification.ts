import { NotificationApplicationRepository } from '../persistence/repositories/notification.repository';
import { NotificationModelApplication } from '../persistence/models/notification.model';
import { Domain } from '../../domain/domain.interface';
import { UuidDomainService } from '../../domain/services/uuid.service';
import { CreateNotificationApplicationDto } from '../dto/create-notification.dto';
import { NotificationApplicationDto } from '../dto/notification.dto';
import { NotificationMapApplication } from '../mappers/notification.mapper';

export class CreateNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationApplicationRepository<NotificationModelApplication>,
    private readonly domainController: Domain,
    private readonly uuidService: UuidDomainService,
  ) {}

  async execute(
    notificationDto: CreateNotificationApplicationDto,
  ): Promise<NotificationApplicationDto> {
    const notificationDataToDomain =
      NotificationMapApplication.toDomainDto(notificationDto);
    const notificationDomain = this.domainController.createNotification(
      notificationDataToDomain,
      this.uuidService,
    );
    const notificationPersistence =
      NotificationMapApplication.toPersistenceDto(notificationDomain);

    const reminderRepo = await this.notificationRepository.create(
      notificationPersistence,
    );

    const answer = NotificationMapApplication.toApplicationDto(reminderRepo);
    return answer;
  }
}

import { NotificationApplicationRepository } from '../persistence/repositories/notification.repository';
import { NotificationModelApplication } from '../persistence/models/notification.model';
import { NotificationApplicationDto } from '../dto/notification.dto';
import { UseCaseException } from '../exceptions/use-case.exception';
import { NotificationMapApplication } from '../mappers/notification.mapper';

export class FindNotificationByIdUseCase {
  constructor(
    private readonly notificationRepository: NotificationApplicationRepository<NotificationModelApplication>,
  ) {}

  async execute(id: string): Promise<NotificationApplicationDto> {
    const notification = await this.notificationRepository.findById(id);
    if (!notification) {
      throw new UseCaseException(`Notification with id ${id} not found`);
    }
    const answer = NotificationMapApplication.toApplicationDto(notification);
    return answer;
  }
}

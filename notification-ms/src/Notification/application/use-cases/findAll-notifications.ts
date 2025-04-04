import { NotificationApplicationRepository } from '../persistence/repositories/notification.repository';
import { NotificationModelApplication } from '../persistence/models/notification.model';
import { NotificationMapApplication } from '../mappers/notification.mapper';
import { NotificationApplicationDto } from '../dto/notification.dto';

export class FindAllNotificationsUseCase {
  constructor(
    private readonly notificationRepository: NotificationApplicationRepository<NotificationModelApplication>,
  ) {}

  async execute({
    userId,
    isRead,
  }: {
    userId: string;
    isRead: boolean;
  }): Promise<NotificationApplicationDto[]> {
    const notifications = await this.notificationRepository.findAll(
      userId,
      isRead,
    );
    const answer = notifications.map((notification) =>
      NotificationMapApplication.toApplicationDto(notification),
    );
    return answer;
  }
}

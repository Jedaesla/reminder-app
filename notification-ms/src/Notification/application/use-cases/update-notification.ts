import { NotificationApplicationRepository } from '../persistence/repositories/notification.repository';
import { NotificationModelApplication } from '../persistence/models/notification.model';

import { NotificationMapApplication } from '../mappers/notification.mapper';
import { NotificationApplicationDto } from '../dto/notification.dto';

export class UpdateNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationApplicationRepository<NotificationModelApplication>,
  ) {}

  async execute(
    id: string,
    isRead: boolean,
  ): Promise<NotificationApplicationDto> {
    const notificationResult = await this.notificationRepository.update(
      id,
      isRead,
    );
    return NotificationMapApplication.toApplicationDto(notificationResult);
  }
}

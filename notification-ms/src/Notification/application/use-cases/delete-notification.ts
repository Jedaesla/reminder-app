import { NotificationApplicationRepository } from '../persistence/repositories/notification.repository';
import { NotificationModelApplication } from '../persistence/models/notification.model';

export class DeleteNotificationUseCase {
  constructor(
    private readonly notificationRepository: NotificationApplicationRepository<NotificationModelApplication>,
  ) {}

  async execute(id: string): Promise<boolean> {
    const notificationResult = await this.notificationRepository.delete(id);
    return notificationResult;
  }
}

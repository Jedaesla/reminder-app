import { Domain } from '../domain/domain.interface';
import { UuidDomainService } from '../domain/services/uuid.service';
import { ApplicationInterface } from './application.interface';
import { CreateNotificationApplicationDto } from './dto/create-notification.dto';
import { NotificationApplicationDto } from './dto/notification.dto';
import { NotificationModelApplication } from './persistence/models/notification.model';
import { NotificationApplicationRepository } from './persistence/repositories/notification.repository';
import { CreateNotificationUseCase } from './use-cases/create-notification';
import { DeleteNotificationUseCase } from './use-cases/delete-notification';
import { FindAllNotificationsUseCase } from './use-cases/findAll-notifications';
import { FindNotificationByIdUseCase } from './use-cases/findById-notification';
import { UpdateNotificationUseCase } from './use-cases/update-notification';

export class ApplicationController extends ApplicationInterface {
  constructor(
    private readonly notificationRepository: NotificationApplicationRepository<NotificationModelApplication>,
    private readonly domainController: Domain,
  ) {
    super();
  }
  createNotification(
    notificationData: CreateNotificationApplicationDto,
    uuidService: UuidDomainService,
  ): Promise<NotificationApplicationDto> {
    const useCase = new CreateNotificationUseCase(
      this.notificationRepository,
      this.domainController,
      uuidService,
    );
    return useCase.execute(notificationData);
  }

  findNotificationById(id: string): Promise<NotificationApplicationDto> {
    const useCase = new FindNotificationByIdUseCase(
      this.notificationRepository,
    );
    return useCase.execute(id);
  }

  findAllNotifications(
    userId: string,
    isRead: boolean,
  ): Promise<NotificationApplicationDto[]> {
    const useCase = new FindAllNotificationsUseCase(
      this.notificationRepository,
    );
    return useCase.execute({ userId, isRead });
  }

  updateNotification(
    id: string,
    isRead: boolean,
  ): Promise<NotificationApplicationDto> {
    const useCase = new UpdateNotificationUseCase(this.notificationRepository);
    return useCase.execute(id, isRead);
  }

  deleteNotification(id: string): Promise<boolean> {
    const useCase = new DeleteNotificationUseCase(this.notificationRepository);
    return useCase.execute(id);
  }
}

export class CreateNotificationDomainDto {
  userId: string;
  reminderId: string;
  title: string;
  message: string;
  isRead: boolean;
  sentAt: string;
}

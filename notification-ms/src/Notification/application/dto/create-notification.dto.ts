export class CreateNotificationApplicationDto {
  userId: string;
  reminderId: string;
  title: string;
  message: string;
  isRead: boolean;
  sentAt: string;
}

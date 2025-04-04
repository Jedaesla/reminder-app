export class NotificationApplicationDto {
  id: string;
  userId: string;
  reminderId: string;
  title: string;
  message: string;
  isRead: boolean;
  sentAt: string;
}

export interface NotificationModelApplication {
  id: string;
  userId: string;
  reminderId: string;
  title: string;
  message: string;
  isRead: boolean;
  sentAt: string;
  createdAt: Date;
  available: boolean;
}

export class CreateReminderApplicationDto {
  userId: string;
  title: string;
  description: string;
  reminderDateTime: string;
  isCompleted: boolean;
}

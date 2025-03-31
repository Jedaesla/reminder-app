export class CreateReminderDomainDto {
  userId: string;
  title: string;
  description: string;
  reminderDateTime: string;
  isCompleted: boolean;
}

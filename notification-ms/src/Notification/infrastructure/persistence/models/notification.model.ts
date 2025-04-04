import { NotificationModelApplication } from 'src/Notification/application/persistence/models/notification.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Notifications' })
export class NotificationModelInfrastructure
  implements NotificationModelApplication
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  userId: string;

  @Column('text')
  reminderId: string;

  @Column('text')
  title: string;

  @Column('text')
  message: string;

  @Column({ type: 'bool', default: false })
  isRead: boolean;

  @Column('text')
  sentAt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'bool', default: true })
  available: boolean;
}

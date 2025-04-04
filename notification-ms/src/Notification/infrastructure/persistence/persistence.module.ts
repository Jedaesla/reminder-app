import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/config';
import { NotificationModelInfrastructure } from './models/notification.model';
import { NotificationRepository } from './repositories/notification.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envs.DATABASE_URL,
      synchronize: true,
      ssl: false,
      autoLoadEntities: true,
      entities: [NotificationModelInfrastructure],
    }),
    TypeOrmModule.forFeature([NotificationModelInfrastructure]),
  ],
  providers: [NotificationRepository],
  exports: [NotificationRepository],
})
export class PersistenceModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/config';
import { ReminderModelInfrastructure } from './models/reminder.model';
import { ReminderRepository } from './repositories/reminder.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      database: envs.DB_NAME,
      username: envs.DB_USERNAME,
      password: envs.DB_PASSWORD,
      synchronize: true,
      entities: [ReminderModelInfrastructure],
    }),
    TypeOrmModule.forFeature([ReminderModelInfrastructure]),
  ],
  providers: [ReminderRepository],
  exports: [ReminderRepository],
})
export class PersistenceModule {}

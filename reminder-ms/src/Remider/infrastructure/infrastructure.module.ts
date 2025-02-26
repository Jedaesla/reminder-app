import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { Domain } from '../domain/domain.interface';
import { DomainController } from '../domain/domain.controller';
import { ApplicationInterface } from '../application/application.interface';
import { ReminderRepository } from './persistence/repositories/reminder.repository';
import { ApplicationController } from '../application/application.controller';
import { InfrastructureController } from './controllers/infrastructure.controller';
import { UuidService } from './persistence/services/uuid.service';

@Module({
  imports: [PersistenceModule],
  controllers: [InfrastructureController],
  providers: [
    UuidService,
    {
      provide: Domain,
      useClass: DomainController,
    },
    {
      provide: ApplicationInterface,
      inject: [ReminderRepository, Domain],
      useFactory: (
        reminderRepository: ReminderRepository,
        domainController: Domain,
      ) => new ApplicationController(reminderRepository, domainController),
    },
  ],
})
export class InfrastructureModule {}

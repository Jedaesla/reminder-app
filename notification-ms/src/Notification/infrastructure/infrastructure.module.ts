import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { Domain } from '../domain/domain.interface';
import { DomainController } from '../domain/domain.controller';
import { ApplicationInterface } from '../application/application.interface';
import { NotificationRepository } from './persistence/repositories/notification.repository';
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
      inject: [NotificationRepository, Domain],
      useFactory: (
        notificationRepository: NotificationRepository,
        domainController: Domain,
      ) => new ApplicationController(notificationRepository, domainController),
    },
  ],
})
export class InfrastructureModule {}

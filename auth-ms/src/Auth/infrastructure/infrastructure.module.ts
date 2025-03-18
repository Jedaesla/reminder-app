import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { Domain } from '../domain/domain.interface';
import { DomainController } from '../domain/domain.controller';
import { ApplicationInterface } from '../application/application.interface';
import { UserRepository } from './persistence/repositories/user.repository';
import { ApplicationController } from '../application/application.controller';
import { InfrastructureController } from './controllers/infrastructure.controller';
import { UuidService } from './services/uuid.service';
import { JwtInfrastructureService } from './services/jwt.service';
import { PasswordHashService } from './services/password-hash.service';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';

@Module({
  imports: [
    PersistenceModule,
    JwtModule.register({
      global: true,
      secret: envs.jwtSecret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [InfrastructureController],
  providers: [
    UuidService,
    JwtInfrastructureService,
    PasswordHashService,
    {
      provide: Domain,
      useClass: DomainController,
    },
    {
      provide: ApplicationInterface,
      inject: [UserRepository, Domain],
      useFactory: (userRepository: UserRepository, domainController: Domain) =>
        new ApplicationController(userRepository, domainController),
    },
  ],
})
export class InfrastructureModule {}

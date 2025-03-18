import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModelInfrastructure } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { envs } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: envs.databaseUrl,
      synchronize: true,
      ssl: false,
      autoLoadEntities: true,
      entities: [UserModelInfrastructure],
    }),
    TypeOrmModule.forFeature([UserModelInfrastructure]),
  ],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class PersistenceModule {}

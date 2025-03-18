import { UserApplicationRepository } from '../persistence/repositories/user.repository';
import { UserModelApplication } from '../persistence/models/user.model';
import { Domain } from '../../domain/domain.interface';
import { UuidDomainService } from '../../domain/services/uuid.service';
import { UserApplicationDto } from '../dto/user.dto';
import { PasswordHashDomainService } from 'src/Auth/domain/services/password-hash.service';
import { CreateUserApplicationDto } from '../dto/create-user.dto';
import { CreateUserDomainDto } from 'src/Auth/domain/dto/create-user.dto';
import { UserDomainDto } from 'src/Auth/domain/dto/user.dto';

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserApplicationRepository<UserModelApplication>,
    private readonly domainController: Domain,
    private readonly uuidService: UuidDomainService,
    private readonly passwordHashService: PasswordHashDomainService,
  ) {}

  async execute(
    userDto: CreateUserApplicationDto,
  ): Promise<UserApplicationDto> {
    const user = this.mapUserDtoToDomain(userDto);
    const data = this.domainController.createUser(
      user,
      this.uuidService,
      this.passwordHashService,
    );
    const userPersistence = this.mapUserDtoToPersistence(data);

    const userDtoRepo = await this.userRepository.create(userPersistence);

    const answer = this.mapUserDtoToApplication(userDtoRepo);
    return answer;
  }

  private mapUserDtoToDomain(
    userDto: CreateUserApplicationDto,
  ): CreateUserDomainDto {
    const user = new CreateUserDomainDto();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;
    return user;
  }

  private mapUserDtoToPersistence(userDto: UserDomainDto): UserApplicationDto {
    const user = new UserApplicationDto();
    user.id = userDto.id;
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;

    return user;
  }

  private mapUserDtoToApplication(
    userDto: UserModelApplication,
  ): UserApplicationDto {
    const user = new UserApplicationDto();
    user.id = userDto.id;
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;

    return user;
  }
}

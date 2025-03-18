import { Domain } from './domain.interface';
import { CreateUserDomainDto } from './dto/create-user.dto';
import { LoginUserDomainDto } from './dto/login-user.dto';
import { UserDomainDto } from './dto/user.dto';
import { UserEntity } from './entitites/user.entity';
import { InvalidDataException } from './exceptions/invalid-data.exception';
import { PasswordHashDomainService } from './services/password-hash.service';
import { UserDomainService } from './services/user.service';
import { UuidDomainService } from './services/uuid.service';

export class DomainController extends Domain {
  createUser(
    data: CreateUserDomainDto,
    uuidService: UuidDomainService,
    passwordHashService: PasswordHashDomainService,
  ): UserDomainDto {
    const user = new UserEntity(passwordHashService);
    user.create(data, uuidService);

    if (user.isValid() === false) {
      throw new InvalidDataException('Invalid reminder data', user.getErrors());
    }
    return user;
  }

  async signIn(
    data: LoginUserDomainDto,
    userService: UserDomainService,
    passwordHashService: PasswordHashDomainService,
  ) {
    const user = new UserEntity(passwordHashService);
    const isValidSignIn = await user.signIn(data, userService);
    if (!isValidSignIn) {
      throw new InvalidDataException('Invalid user data', user.getErrors());
    }
    return isValidSignIn;
  }
}

import { CreateUserDomainDto } from './dto/create-user.dto';
import { LoginUserDomainDto } from './dto/login-user.dto';
import { UserDomainDto } from './dto/user.dto';
import { PasswordHashDomainService } from './services/password-hash.service';
import { UserDomainService } from './services/user.service';
import { UuidDomainService } from './services/uuid.service';

export abstract class Domain {
  abstract createUser(
    data: CreateUserDomainDto,
    uuidService: UuidDomainService,
    passwordHashService: PasswordHashDomainService,
  ): UserDomainDto;
  abstract signIn(
    data: LoginUserDomainDto,
    userService: UserDomainService,
    passwordHashService: PasswordHashDomainService,
  ): Promise<boolean>;
}

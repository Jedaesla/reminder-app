import { UuidDomainService } from '../domain/services/uuid.service';
import { UserApplicationDto } from './dto/user.dto';
import { CreateUserApplicationDto } from './dto/create-user.dto';
import { PasswordHashDomainService } from '../domain/services/password-hash.service';
import { SignInUserApplicationDto } from './dto/signin-user.dto';
import { JwtApplicationService } from './services/jwt.service';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
export abstract class ApplicationInterface {
  abstract createUser(
    data: CreateUserApplicationDto,
    uuidService: UuidDomainService,
    passwordHashService: PasswordHashDomainService,
  ): Promise<UserApplicationDto>;
  abstract signIn(
    data: SignInUserApplicationDto,
    jwtService: JwtApplicationService,
    passwordHashService: PasswordHashDomainService,
  ): Promise<{ token: string }>;
  abstract validateToken(
    token: string,
    jwtService: JwtApplicationService,
  ): Promise<{ user: JwtPayload; token: string }>;
}

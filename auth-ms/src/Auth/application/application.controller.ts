import { Domain } from '../domain/domain.interface';
import { UuidDomainService } from '../domain/services/uuid.service';
import { ApplicationInterface } from './application.interface';
import { UserApplicationDto } from './dto/user.dto';
import { UserModelApplication } from './persistence/models/user.model';
import { UserApplicationRepository } from './persistence/repositories/user.repository';
import { CreateUserUseCase } from './use-cases/create-user';
import { PasswordHashDomainService } from '../domain/services/password-hash.service';
import { CreateUserApplicationDto } from './dto/create-user.dto';
import { SignInUserApplicationDto } from './dto/signin-user.dto';
import { JwtApplicationService } from './services/jwt.service';
import { SignInUserUseCase } from './use-cases/sign-in-user';
import { ValidateTokenUseCase } from './use-cases/validate-token';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';

export class ApplicationController extends ApplicationInterface {
  constructor(
    private readonly userRepository: UserApplicationRepository<UserModelApplication>,
    private readonly domainController: Domain,
  ) {
    super();
  }

  createUser(
    data: CreateUserApplicationDto,
    uuidService: UuidDomainService,
    passwordHashService: PasswordHashDomainService,
  ): Promise<UserApplicationDto> {
    const useCase = new CreateUserUseCase(
      this.userRepository,
      this.domainController,
      uuidService,
      passwordHashService,
    );
    return useCase.execute(data);
  }
  async signIn(
    data: SignInUserApplicationDto,
    jwtService: JwtApplicationService,
    passwordHashService: PasswordHashDomainService,
  ): Promise<{ token: string }> {
    const useCase = new SignInUserUseCase(
      this.userRepository,
      this.domainController,
      jwtService,
      passwordHashService,
    );
    const dataResult = await useCase.execute(data);
    return {
      token: dataResult.token,
    };
  }

  async validateToken(
    token: string,
    jwtService: JwtApplicationService,
  ): Promise<{ user: JwtPayload; token: string }> {
    const useCase = new ValidateTokenUseCase(jwtService);
    const dataResult = await useCase.execute(token);
    return {
      token: dataResult.token,
      user: dataResult.user,
    };
  }
}

import { ApplicationController } from './application.controller';
import { UserApplicationRepository } from './persistence/repositories/user.repository';
import { UserModelApplication } from './persistence/models/user.model';
import { Domain } from '../domain/domain.interface';
import { UuidDomainService } from '../domain/services/uuid.service';
import { PasswordHashDomainService } from '../domain/services/password-hash.service';
import { JwtApplicationService } from './services/jwt.service';

import { CreateUserApplicationDto } from './dto/create-user.dto';
import { SignInUserApplicationDto } from './dto/signin-user.dto';
import { UserApplicationDto } from './dto/user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { TokenApplicationDto } from './dto/token.dto';

import { CreateUserUseCase } from './use-cases/create-user';
import { SignInUserUseCase } from './use-cases/sign-in-user';
import { ValidateTokenUseCase } from './use-cases/validate-token';

jest.mock('./use-cases/create-user');
jest.mock('./use-cases/sign-in-user');
jest.mock('./use-cases/validate-token');

describe('ApplicationController', () => {
  let controller: ApplicationController;
  let userRepository: UserApplicationRepository<UserModelApplication>;
  let domainController: Domain;

  beforeEach(() => {
    userRepository = {} as any;
    domainController = {} as any;
    controller = new ApplicationController(userRepository, domainController);
  });

  test('should call CreateUserUseCase with correct params', async () => {
    const dto: CreateUserApplicationDto = {
      name: 'John',
      email: 'jhon@example.com',
      password: 'Password123',
    };
    const uuidService: UuidDomainService = {} as any;
    const passwordHashService: PasswordHashDomainService = {} as any;

    const expectedResult: UserApplicationDto = {
      id: '1',
      name: 'John',
      email: 'jhon@example.com',
      password: 'hashedPass',
    };

    (CreateUserUseCase.prototype.execute as jest.Mock).mockResolvedValue(
      expectedResult,
    );

    const result = await controller.createUser(
      dto,
      uuidService,
      passwordHashService,
    );

    expect(CreateUserUseCase.prototype.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });

  test('should call SignInUserUseCase and return a token', async () => {
    const dto: SignInUserApplicationDto = {
      email: 'test@example.com',
      password: 'Password123',
    };

    const passwordHashService: PasswordHashDomainService = {} as any;
    const jwtService: JwtApplicationService = {} as any;

    const resultMock: TokenApplicationDto = { token: 'jwt-token' };

    (SignInUserUseCase.prototype.execute as jest.Mock).mockResolvedValue(
      resultMock,
    );

    const result = await controller.signIn(
      dto,
      jwtService,
      passwordHashService,
    );

    expect(SignInUserUseCase.prototype.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ token: 'jwt-token' });
  });

  test('should call ValidateTokenUseCase and return token + user data', async () => {
    const token = 'jwt-token';
    const jwtService: JwtApplicationService = {} as any;

    const expectedPayload: JwtPayload = {
      id: 'user-id',
      email: 'user@example.com',
      name: 'User',
    };

    const resultMock = {
      token: 'new-jwt-token',
      user: expectedPayload,
    };

    (ValidateTokenUseCase.prototype.execute as jest.Mock).mockResolvedValue(
      resultMock,
    );

    const result = await controller.validateToken(token, jwtService);

    expect(ValidateTokenUseCase.prototype.execute).toHaveBeenCalledWith(token);
    expect(result).toEqual({
      token: 'new-jwt-token',
      user: expectedPayload,
    });
  });
});

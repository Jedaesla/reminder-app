import { SignInUserUseCase } from './sign-in-user';
import { UserApplicationRepository } from '../persistence/repositories/user.repository';
import { Domain } from 'src/Auth/domain/domain.interface';
import { JwtApplicationService } from '../services/jwt.service';
import { PasswordHashDomainService } from 'src/Auth/domain/services/password-hash.service';
import { SignInUserApplicationDto } from '../dto/signin-user.dto';
import { UserModelApplication } from '../persistence/models/user.model';
import { UseCaseException } from '../exceptions/use-case.exception';

describe('SignInUserUseCase', () => {
  let useCase: SignInUserUseCase;
  let userRepository: jest.Mocked<
    UserApplicationRepository<UserModelApplication>
  >;
  let domainController: jest.Mocked<Domain>;
  let jwtService: jest.Mocked<JwtApplicationService>;
  let passwordHashService: jest.Mocked<PasswordHashDomainService>;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };

    domainController = {
      createUser: jest.fn(),
      signIn: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(),
      verify: jest.fn(),
    };

    passwordHashService = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    useCase = new SignInUserUseCase(
      userRepository,
      domainController,
      jwtService,
      passwordHashService,
    );
  });

  const dto: SignInUserApplicationDto = {
    email: 'john@example.com',
    password: 'Password123',
  };

  const user: UserModelApplication = {
    id: 'XYZ-123',
    name: 'John',
    email: 'john@example.com',
    password: 'hashedPassword',
    isActive: true,
    createdAt: new Date(),
    updatedAt: null,
  };

  test('should return a token when credentials are valid', async () => {
    domainController.signIn.mockReturnValue(true);
    userRepository.findByEmail.mockResolvedValue(user);
    passwordHashService.compare.mockReturnValue(true);
    jwtService.sign.mockReturnValue('jwt-token');

    const result = await useCase.execute(dto);

    expect(domainController.signIn).toHaveBeenCalledWith(
      dto,
      passwordHashService,
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(passwordHashService.compare).toHaveBeenCalledWith(
      dto.password,
      user.password,
    );
    expect(jwtService.sign).toHaveBeenCalledWith({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    expect(result).toEqual({ token: 'jwt-token' });
  });

  test('should throw if domain signIn returns false', async () => {
    domainController.signIn.mockReturnValue(false);

    await expect(useCase.execute(dto)).rejects.toThrow(UseCaseException);
    expect(userRepository.findByEmail).not.toHaveBeenCalled();
  });

  test('should throw if user not found', async () => {
    domainController.signIn.mockReturnValue(true);
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toThrow(UseCaseException);
  });

  test('should throw if password is invalid', async () => {
    domainController.signIn.mockReturnValue(true);
    userRepository.findByEmail.mockResolvedValue(user);
    passwordHashService.compare.mockReturnValue(false);

    await expect(useCase.execute(dto)).rejects.toThrow(UseCaseException);
  });
});

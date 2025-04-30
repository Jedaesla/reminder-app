import { CreateUserUseCase } from './create-user';
import { UserApplicationRepository } from '../persistence/repositories/user.repository';
import { UserModelApplication } from '../persistence/models/user.model';
import { Domain } from '../../domain/domain.interface';
import { UuidDomainService } from '../../domain/services/uuid.service';
import { PasswordHashDomainService } from '../../domain/services/password-hash.service';
import { CreateUserApplicationDto } from '../dto/create-user.dto';
import { UserDomainDto } from 'src/Auth/domain/dto/user.dto';
import { UserApplicationDto } from '../dto/user.dto';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: jest.Mocked<
    UserApplicationRepository<UserModelApplication>
  >;
  let domain: jest.Mocked<Domain>;
  let uuidService: jest.Mocked<UuidDomainService>;
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

    domain = {
      createUser: jest.fn(),
      signIn: jest.fn(),
    };

    uuidService = {
      generateUuid: jest.fn(),
      validateUuid: jest.fn(),
    };

    passwordHashService = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    useCase = new CreateUserUseCase(
      userRepository,
      domain,
      uuidService,
      passwordHashService,
    );
  });

  test('should create a user and return application DTO', async () => {
    const inputDto: CreateUserApplicationDto = {
      name: 'Jhon',
      email: 'jhon@example.com',
      password: 'Password123',
    };

    const userDomainDto: UserDomainDto = {
      id: 'uuid-123',
      name: 'Jhon',
      email: 'jhon@example.com',
      password: 'Password123',
      isActive: true,
    };

    const userModel: UserModelApplication = {
      id: 'uuid-123',
      name: 'Jhon',
      email: 'jhon@example.com',
      password: 'Password123',
      isActive: true,
      createdAt: new Date(),
      updatedAt: null,
    };

    const returnData: UserApplicationDto = {
      id: 'uuid-123',
      name: 'Jhon',
      email: 'jhon@example.com',
      password: 'Password123',
    };

    domain.createUser.mockReturnValue(userDomainDto);
    userRepository.create.mockResolvedValue(userModel);

    const result = await useCase.execute(inputDto);

    expect(domain.createUser).toHaveBeenCalledWith(
      expect.objectContaining(inputDto),
      uuidService,
      passwordHashService,
    );

    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ ...inputDto, id: 'uuid-123' }),
    );

    expect(result).toEqual(expect.objectContaining(returnData));
  });
});

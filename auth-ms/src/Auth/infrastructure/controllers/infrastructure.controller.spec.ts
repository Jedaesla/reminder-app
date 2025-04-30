import { Test, TestingModule } from '@nestjs/testing';
import { InfrastructureController } from './infrastructure.controller';
import { ApplicationInterface } from 'src/Auth/application/application.interface';
import { UuidService } from '../services/uuid.service';
import { JwtInfrastructureService } from '../services/jwt.service';
import { PasswordHashService } from '../services/password-hash.service';
import { RpcException } from '@nestjs/microservices';
import { CreateUserInfraDto } from '../dto/create-user.dto';
import { SignInUserInfraDto } from '../dto/sigin-user.dto';

describe('InfrastructureController', () => {
  let controller: InfrastructureController;
  let applicationMock: jest.Mocked<ApplicationInterface>;
  let uuidServiceMock: jest.Mocked<UuidService>;
  let jwtServiceMock: jest.Mocked<JwtInfrastructureService>;
  let passwordHashServiceMock: jest.Mocked<PasswordHashService>;

  beforeEach(async () => {
    applicationMock = {
      createUser: jest.fn(),
      signIn: jest.fn(),
      validateToken: jest.fn(),
    } as any;

    uuidServiceMock = {} as any;
    jwtServiceMock = {} as any;
    passwordHashServiceMock = {} as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfrastructureController],
      providers: [
        { provide: ApplicationInterface, useValue: applicationMock },
        { provide: UuidService, useValue: uuidServiceMock },
        { provide: JwtInfrastructureService, useValue: jwtServiceMock },
        { provide: PasswordHashService, useValue: passwordHashServiceMock },
      ],
    }).compile();

    controller = module.get<InfrastructureController>(InfrastructureController);
  });

  test('createUser - should create a user and return it without password', async () => {
    const userResponseMock = {
      id: '1',
      email: 'test@test.com',
      password: 'secret',
      name: 'test',
    };
    applicationMock.createUser.mockResolvedValue(userResponseMock);

    const dto: CreateUserInfraDto = {
      email: 'test@test.com',
      password: 'secret',
      name: 'test',
    };
    const result = await controller.createUser(dto);

    expect(result).toEqual({
      id: userResponseMock.id,
      email: userResponseMock.email,
      name: userResponseMock.name,
    });
    expect(applicationMock.createUser).toHaveBeenCalledWith(
      dto,
      uuidServiceMock,
      passwordHashServiceMock,
    );
  });

  test('should throw RpcException on error', async () => {
    applicationMock.createUser.mockRejectedValue(new Error('Create error'));

    await expect(controller.createUser({} as any)).rejects.toThrow(
      RpcException,
    );
  });

  test('signInUser - should sign in a user and return data', async () => {
    const dataLoginMock = { token: 'token' };
    applicationMock.signIn.mockResolvedValue(dataLoginMock);

    const dto: SignInUserInfraDto = {
      email: 'test@test.com',
      password: 'secret',
    };
    const result = await controller.signInUser(dto);

    expect(result).toEqual(dataLoginMock);
    expect(applicationMock.signIn).toHaveBeenCalledWith(
      dto,
      jwtServiceMock,
      passwordHashServiceMock,
    );
  });

  test('should throw RpcException on error', async () => {
    applicationMock.signIn.mockRejectedValue(new Error('SignIn error'));

    await expect(controller.signInUser({} as any)).rejects.toThrow(
      RpcException,
    );
  });

  test('verifyToken - should verify a token and return validation', async () => {
    const tokenValidationMock = {
      user: { name: 'Test' },
      token: 'verified-token',
    };
    applicationMock.validateToken.mockResolvedValue(tokenValidationMock);

    const token = 'valid-token';
    const result = await controller.verifyToken(token);

    expect(result).toEqual(tokenValidationMock);
    expect(applicationMock.validateToken).toHaveBeenCalledWith(
      token,
      jwtServiceMock,
    );
  });

  test('should throw RpcException on error', async () => {
    applicationMock.validateToken.mockRejectedValue(new Error('Token error'));

    await expect(controller.verifyToken('invalid-token')).rejects.toThrow(
      RpcException,
    );
  });
});

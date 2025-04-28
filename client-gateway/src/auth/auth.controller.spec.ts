import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { NATS_SERVICE } from 'src/config';
import { RpcException } from '@nestjs/microservices';
import { of, throwError } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sigin-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let mockClientProxy: any;

  beforeEach(async () => {
    mockClientProxy = {
      send: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: NATS_SERVICE,
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  const createUserDto: CreateUserDto = {
    name: 'test',
    email: 'test@example.com',
    password: 'password123',
  };

  const signInUserDto: SignInUserDto = {
    email: 'test@example.com',
    password: 'password123',
  };

  test('createUser - should create a user successfully', async () => {
    const dataResponse = { id: 'XXXX-XXXX', ...createUserDto };
    mockClientProxy.send.mockReturnValue(of(dataResponse));

    const result = await controller.createUser(createUserDto);

    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'create_user' },
      createUserDto,
    );
    expect(result).toEqual(dataResponse);
  });

  test('createUser - should throw RpcException if client.send fails', async () => {
    mockClientProxy.send.mockReturnValue(
      throwError(() => new Error('Fail response')),
    );

    await expect(controller.createUser(createUserDto)).rejects.toThrow(
      RpcException,
    );
  });

  test('signInUser - should sign in a user successfully', async () => {
    const dataResponse = { accessToken: 'token' };
    mockClientProxy.send.mockReturnValue(of(dataResponse));

    const result = await controller.signInUser(signInUserDto);

    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'signin_user' },
      signInUserDto,
    );
    expect(result).toEqual(dataResponse);
  });

  test('signInUser - should throw RpcException if client.send fails', async () => {
    mockClientProxy.send.mockReturnValue(throwError(() => new Error('Fail')));

    await expect(controller.signInUser(signInUserDto)).rejects.toThrow(
      RpcException,
    );
  });

  test('verifyToken - should return user and token', () => {
    const user = { id: 'XXXX-XXXXX', email: 'test@example.com', name: 'test' };
    const token = 'jwt-token';

    const result = controller.verifyToken(user, token);

    expect(result).toEqual({ user, token });
  });
});

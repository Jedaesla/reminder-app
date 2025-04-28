import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { NATS_SERVICE } from 'src/config';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { of, throwError } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockClientProxy: any;
  let mockContext: Partial<ExecutionContext>;
  let mockRequest: any;

  beforeEach(async () => {
    mockClientProxy = {
      send: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: NATS_SERVICE,
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);

    mockRequest = {
      headers: {
        authorization: 'Bearer valid-token',
      },
    };

    mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: () => mockRequest,
      }),
    };
  });

  test('should allow access when token is valid', async () => {
    const userPayload = { user: { id: 'user-id' }, token: 'new-token' };
    mockClientProxy.send.mockReturnValue(of(userPayload));

    const result = await guard.canActivate(mockContext as ExecutionContext);

    expect(result).toBe(true);
    expect(mockRequest.user).toEqual(userPayload.user);
    expect(mockRequest.token).toEqual(userPayload.token);
    expect(mockClientProxy.send).toHaveBeenCalledWith(
      { cmd: 'verify_token' },
      'valid-token',
    );
  });

  test('should throw UnauthorizedException when token is missing', async () => {
    mockRequest.headers.authorization = undefined;

    await expect(
      guard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  test('should throw UnauthorizedException when verification fails', async () => {
    mockClientProxy.send.mockReturnValue(
      throwError(() => new Error('Invalid token')),
    );

    await expect(
      guard.canActivate(mockContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  test('should extract token correctly from Authorization header', () => {
    const extracted = (guard as any).extractTokenFromHeader(mockRequest);
    expect(extracted).toBe('valid-token');
  });

  test('should return undefined if Authorization header is not Bearer', () => {
    mockRequest.headers.authorization = 'NoBearer XXYYZZ';
    const extracted = (guard as any).extractTokenFromHeader(mockRequest);
    expect(extracted).toBeUndefined();
  });

  test('should return undefined if Authorization header is missing', () => {
    mockRequest.headers.authorization = undefined;
    const extracted = (guard as any).extractTokenFromHeader(mockRequest);
    expect(extracted).toBeUndefined();
  });
});

import { ValidateTokenUseCase } from './validate-token';
import { JwtApplicationService } from '../services/jwt.service';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { envs } from 'src/config';

jest.mock('src/config', () => ({
  envs: {
    jwtSecret: 'my-secret-key',
  },
}));

describe('ValidateTokenUseCase', () => {
  let useCase: ValidateTokenUseCase;
  let jwtService: jest.Mocked<JwtApplicationService>;

  beforeEach(() => {
    jwtService = {
      sign: jest.fn(),
      verify: jest.fn(),
    };

    useCase = new ValidateTokenUseCase(jwtService);
  });

  test('should validate token and return new token with user data', async () => {
    const token = 'jwt-token';
    const payload: JwtPayload = {
      id: 'user-id',
      name: 'John',
      email: 'john@example.com',
    };

    const jwtVerifyResult = {
      ...payload,
      sub: 'some-sub',
      iat: 123456,
      exp: 654321,
    };

    jwtService.verify.mockResolvedValue(jwtVerifyResult);
    jwtService.sign.mockReturnValue('new-jwt-token');

    const result = await useCase.execute(token);

    expect(jwtService.verify).toHaveBeenCalledWith(token, {
      secret: envs.jwtSecret,
    });

    expect(jwtService.sign).toHaveBeenCalledWith(payload);

    expect(result).toEqual({
      token: 'new-jwt-token',
      user: payload,
    });
  });

  test('should throw if token is invalid', async () => {
    const token = 'bad-token';

    jwtService.verify.mockRejectedValue(new Error('Invalid token'));

    await expect(useCase.execute(token)).rejects.toThrow('Invalid token');
    expect(jwtService.verify).toHaveBeenCalledWith(token, {
      secret: envs.jwtSecret,
    });
  });
});

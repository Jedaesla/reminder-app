import { JwtInfrastructureService } from './jwt.service';
import { JwtService } from '@nestjs/jwt';

describe('JwtInfrastructureService', () => {
  let service: JwtInfrastructureService;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = {
      sign: jest.fn(),
      verify: jest.fn(),
    } as any;

    service = new JwtInfrastructureService(jwtService);
  });

  describe('sign', () => {
    test('should return a signed JWT token', () => {
      const payload = { id: '123', email: 'test@example.com', name: 'test' };
      (jwtService.sign as jest.Mock).mockReturnValue('signed-token');

      const token = service.sign(payload);
      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(token).toBe('signed-token');
    });
  });

  test('verify - should verify and return the payload', () => {
    const token = 'signed-token';
    const decoded = { id: '123', email: 'test@example.com' };
    (jwtService.verify as jest.Mock).mockReturnValue(decoded);

    const result = service.verify(token);
    expect(jwtService.verify).toHaveBeenCalledWith(token, undefined);
    expect(result).toBe(decoded);
  });

  test('should verify with custom options', () => {
    const token = 'signed-token';
    const options = { secret: 'my-secret' };
    const decoded = { id: '123', email: 'test@example.com' };
    (jwtService.verify as jest.Mock).mockReturnValue(decoded);

    const result = service.verify(token, options);
    expect(jwtService.verify).toHaveBeenCalledWith(token, options);
    expect(result).toBe(decoded);
  });
});

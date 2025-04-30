import { PasswordHashService } from './password-hash.service';
import * as bcrypt from 'bcrypt';

describe('PasswordHashService', () => {
  let service: PasswordHashService;

  beforeEach(() => {
    service = new PasswordHashService();
  });

  test('hash - should return a hashed password', () => {
    const plainPassword = 'myPassword123';
    const hashed = service.hash(plainPassword);

    expect(typeof hashed).toBe('string');
    expect(hashed).not.toBe(plainPassword);
    expect(bcrypt.compareSync(plainPassword, hashed)).toBe(true);
  });

  test('compare - should return true for matching passwords', () => {
    const plainPassword = 'securePassword';
    const hashed = bcrypt.hashSync(plainPassword, 10);

    const result = service.compare(plainPassword, hashed);
    expect(result).toBe(true);
  });

  test('compare - should return false for non-matching passwords', () => {
    const hashed = bcrypt.hashSync('correctPassword', 10);

    const result = service.compare('wrongPassword', hashed);
    expect(result).toBe(false);
  });
});

import { UuidService } from './uuid.service';
import * as uuid from 'uuid';

jest.mock('uuid');

describe('UuidService', () => {
  let service: UuidService;

  beforeEach(() => {
    service = new UuidService();
  });

  test('generateUuid - should call uuid.v4 and return its result', () => {
    const mockUuid = 'ABCDE-FGHIJ';
    (uuid.v4 as jest.Mock).mockReturnValue(mockUuid);
    const result = service.generateUuid();
    expect(uuid.v4).toHaveBeenCalled();
    expect(result).toBe(mockUuid);
  });

  test('validateUuid - should call validate and version and return true if both are correct', () => {
    (uuid.validate as jest.Mock).mockReturnValue(true);
    (uuid.version as jest.Mock).mockReturnValue(4);

    const result = service.validateUuid('ABC');
    expect(uuid.validate).toHaveBeenCalledWith('ABC');
    expect(uuid.version).toHaveBeenCalledWith('ABC');
    expect(result).toBe(true);
  });

  test('should return false if validate is false', () => {
    (uuid.validate as jest.Mock).mockReturnValue(false);

    const result = service.validateUuid('ABC');
    expect(result).toBe(false);
  });

  test('should return false if version is not 4', () => {
    (uuid.validate as jest.Mock).mockReturnValue(true);
    (uuid.version as jest.Mock).mockReturnValue(1);

    const result = service.validateUuid('ABC');
    expect(result).toBe(false);
  });
});

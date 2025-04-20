import { ReminderEntity } from './reminder.entity';
import { CreateReminderDomainDto } from '../dto/create-reminder.dto';

describe('ReminderEntity', () => {
  let mockUuidService: {
    generateUuid: jest.Mock;
    validateUuid: jest.Mock;
  };

  beforeEach(() => {
    mockUuidService = {
      generateUuid: jest.fn().mockReturnValue('ABCD-EFGH'),
      validateUuid: jest.fn().mockReturnValue(true),
    };
  });

  const createDto: CreateReminderDomainDto = {
    userId: '1234-5678',
    title: 'Test reminder',
    description: 'Test description',
    reminderDateTime: '2025-04-12 10:00',
    isCompleted: false,
  };

  test('should create a reminder successfully and valide it', () => {
    const reminderEntity = new ReminderEntity(mockUuidService as any);
    reminderEntity.create(createDto);

    expect(reminderEntity.id).toBe('ABCD-EFGH');
    expect(reminderEntity.userId).toBe(createDto.userId);
    expect(reminderEntity.title).toBe(createDto.title);
    expect(reminderEntity.description).toBe(createDto.description);
    expect(reminderEntity.reminderDateTime).toBe(createDto.reminderDateTime);
    expect(reminderEntity.isCompleted).toBe(createDto.isCompleted);
    expect(reminderEntity.isValid()).toBe(true);
    expect(reminderEntity.getErrors().size).toBe(0);
  });

  test('should get invalid create reminder when UUID, userId, title and reminderDateTime is not valid', () => {
    mockUuidService.validateUuid.mockReturnValueOnce(false);
    const reminderEntity = new ReminderEntity(mockUuidService as any);
    reminderEntity.create({
      userId: '',
      title: ' ',
      description: '',
      reminderDateTime: '',
      isCompleted: false,
    });

    expect(reminderEntity.isValid()).toBe(false);
    expect(reminderEntity.getErrors().has('id')).toBe(true);
    expect(reminderEntity.getErrors().has('title')).toBe(true);
    expect(reminderEntity.getErrors().has('reminderDateTime')).toBe(true);
    expect(reminderEntity.getErrors().has('title')).toBe(true);
  });

  test('should validateId correctly', () => {
    const reminderEntity = new ReminderEntity(mockUuidService as any);
    const result = reminderEntity.validateId('XYZ-123');
    expect(mockUuidService.validateUuid).toHaveBeenCalledWith('XYZ-123');
    expect(result).toBe(true);
  });

  test('should validateTitle correctly', () => {
    const reminderEntity = new ReminderEntity(mockUuidService as any);
    reminderEntity.title = 'Valid title';
    expect(reminderEntity.validateTitle()).toBe(true);
    reminderEntity.title = ' ';
    expect(reminderEntity.validateTitle()).toBe(false);
  });

  test('should validate reminderDateTime correctly', () => {
    const reminderEntity = new ReminderEntity(mockUuidService as any);
    reminderEntity.reminderDateTime = '2025-04-11 08:20';
    expect(reminderEntity.validateReminderDateTime()).toBe(true);
    reminderEntity.reminderDateTime = ' ';
    expect(reminderEntity.validateReminderDateTime()).toBe(false);
  });
});

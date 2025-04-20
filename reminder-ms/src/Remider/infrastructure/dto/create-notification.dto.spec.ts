import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateNotificationInfraDto } from './create-notification.dto';

describe('CreateNotificationInfraDto', () => {
  test('should validate a valid dto', async () => {
    const dto = {
      userId: '12345-67890',
      reminderId: 'XYZAD-ABCDE',
      title: 'Reminder Title',
      message: 'Reminder message.',
      isRead: false,
      sentAt: '2025-04-16 08:00',
    };

    const instance = plainToInstance(CreateNotificationInfraDto, dto);
    const errors = await validate(instance);

    expect(errors.length).toBe(0);
  });

  test('should fail validation with invalid input', async () => {
    const invalidDto = {
      userId: 123,
      reminderId: true,
      title: 789,
      message: {},
      isRead: 'false',
      sentAt: 12345,
    };

    const instance = plainToInstance(CreateNotificationInfraDto, invalidDto);
    const errors = await validate(instance);

    expect(errors.length).toBeGreaterThan(0);

    const propsWithErrors = errors.map((e) => e.property);
    expect(propsWithErrors).toEqual(
      expect.arrayContaining([
        'userId',
        'reminderId',
        'title',
        'message',
        'isRead',
        'sentAt',
      ]),
    );
  });
});

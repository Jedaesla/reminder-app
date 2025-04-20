import { Test, TestingModule } from '@nestjs/testing';
import { InfrastructureModule } from './infrastructure.module';
import { ApplicationInterface } from '../application/application.interface';
import { Domain } from '../domain/domain.interface';
import { UuidService } from './persistence/services/uuid.service';
import { NotificationService } from './persistence/services/notification.service';

class MockReminderRepository {}
class MockDomainController {}
class MockApplicationController {
  constructor(repo: any, domain: any) {}
}
class MockUuidService {}
class MockNotificationService {}

jest.mock('./persistence/persistence.module', () => ({
  PersistenceModule: class {},
}));
jest.mock('src/transports/nats.module', () => ({
  NatsModule: class {},
}));

describe('InfrastructureModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [InfrastructureModule],
    })
      .overrideProvider(UuidService)
      .useClass(MockUuidService)
      .overrideProvider(NotificationService)
      .useClass(MockNotificationService)
      .overrideProvider(Domain)
      .useClass(MockDomainController)
      .overrideProvider(ApplicationInterface)
      .useFactory({
        factory: () =>
          new MockApplicationController(
            new MockReminderRepository(),
            new MockDomainController(),
          ),
      })
      .compile();
  });

  test('should provide UuidService', () => {
    const service = module.get(UuidService);
    expect(service).toBeInstanceOf(MockUuidService);
  });

  test('should provide NotificationService', () => {
    const service = module.get(NotificationService);
    expect(service).toBeInstanceOf(MockNotificationService);
  });

  test('should provide Domain', () => {
    const service = module.get(Domain);
    expect(service).toBeInstanceOf(MockDomainController);
  });

  test('should provide ApplicationInterface', () => {
    const service = module.get(ApplicationInterface);
    expect(service).toBeInstanceOf(MockApplicationController);
  });
});

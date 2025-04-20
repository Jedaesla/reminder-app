import { Test, TestingModule } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { NatsModule } from './nats.module';
import { NATS_SERVICE } from 'src/config';

describe('NatsModule', () => {
  let client: ClientProxy;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [NatsModule],
    }).compile();

    client = module.get<ClientProxy>(NATS_SERVICE);
  });

  test('should provide a NATS client', () => {
    expect(client).toBeDefined();
    expect(typeof client.connect).toBe('function');
  });
});

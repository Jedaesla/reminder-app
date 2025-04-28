import { Controller, Get, UseGuards } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { User } from './user.decorator';

class MockAuthGuardForUser {
  canActivate(context: ExecutionContext): boolean {
    const httpRequest = context.switchToHttp().getRequest();
    httpRequest['user'] = { name: 'test' };
    return true;
  }
}

@Controller('test-user')
class TestUserController {
  @Get('profile')
  @UseGuards(MockAuthGuardForUser)
  getProfile(@User() user: any) {
    return { user };
  }
}

describe('User Decorator', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TestUserController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('should return the user object from the request when the route is accessed', async () => {
    return request(app.getHttpServer())
      .get('/test-user/profile')
      .expect(200)
      .expect({ user: { name: 'test' } });
  });

  test('should return 500 if the user object is not in the request', async () => {
    class MockAuthGuardNoUser {
      canActivate(context: ExecutionContext): boolean {
        return true;
      }
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TestUserController],
    })
      .overrideGuard(MockAuthGuardForUser)
      .useClass(MockAuthGuardNoUser)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    return request(app.getHttpServer())
      .get('/test-user/profile')
      .expect(500)
      .expect({
        statusCode: 500,
        message: 'User not found in request (AuthGuard called?)',
        error: 'Internal Server Error',
      });
  });
});

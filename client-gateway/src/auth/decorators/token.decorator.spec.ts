import { Controller, Get, UseGuards } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Token } from './token.decorator';

class MockAuthGuard {
  canActivate(context: ExecutionContext): boolean {
    const httpRequest = context.switchToHttp().getRequest();
    httpRequest['token'] = httpRequest.headers['authorization']?.split(' ')[1];
    return true;
  }
}

@Controller('test')
class TestController {
  @Get('protected')
  @UseGuards(MockAuthGuard)
  protectedRoute(@Token() token: string) {
    return { token };
  }
}

describe('Token Decorator', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('should return the token from the request when the route is accessed', async () => {
    const testToken = 'test-token';

    return request(app.getHttpServer())
      .get('/test/protected')
      .set('Authorization', `Bearer ${testToken}`)
      .expect(200)
      .expect({ token: testToken });
  });

  test('should return 500 with the correct error message if the token is not in the request', async () => {
    return request(app.getHttpServer())
      .get('/test/protected')
      .expect(500)
      .expect({
        statusCode: 500,
        message: 'Token not found in request (AuthGuard called?)',
        error: 'Internal Server Error',
      });
  });
});

import { RpcCustomExceptionFilter } from './rpc-custom-exception.filter';
import { RpcException } from '@nestjs/microservices';

const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

const mockArgumentsHost = {
  switchToHttp: jest.fn().mockReturnValue({
    getResponse: jest.fn().mockReturnValue(mockResponse),
  }),
};

describe('RpcCustomExceptionFilter', () => {
  let filter: RpcCustomExceptionFilter;

  beforeEach(() => {
    filter = new RpcCustomExceptionFilter();
  });

  test('should handle RpcException return status 500 when message is Empty response', () => {
    const exception = new RpcException('Empty response');
    filter.catch(exception, mockArgumentsHost as any);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 500,
      message: '',
    });
  });

  test('should handle RpcException with generic error', () => {
    const exception = new RpcException('Generic Error');
    filter.catch(exception, mockArgumentsHost as any);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 400,
      message: 'Generic Error',
    });
  });

  test('should handle RpcException with generic error', () => {
    const exception = new RpcException({
      message: 'Not Found',
      status: 404,
    });
    filter.catch(exception, mockArgumentsHost as any);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Not Found',
      status: 404,
    });
  });
});

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  LoggerService,
} from '@nestjs/common';
import { TypeORMError, QueryFailedError } from 'typeorm';

@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let code = 500;
    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno;
    }
    // 响应 请求对象
    const response = ctx.getResponse();
    this.logger.error({
      code: code,
      timestamp: new Date().toISOString(),
      // path: request.url,
      // method: request.method,
      message: exception.message,
    });
    response.status(500).json({
      code: code,
      timestamp: new Date().toISOString(),
      // path: request.url,
      // method: request.method,
      message: exception.message,
    });
  }
}

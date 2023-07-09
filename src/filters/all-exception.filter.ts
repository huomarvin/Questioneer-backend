import {
  BadRequestException,
  ExceptionFilter,
  HttpAdapterHost,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { MongooseError } from 'mongoose';

import * as requestIp from 'request-ip';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(
      '🚀 ~ file: all-exception.filter.ts:19 ~ AllExceptionFilter ~ exception:',
      exception,
    );
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
    }

    let msg: unknown =
      exception['message'] || exception['response'] || 'Internal Server Error';
    // 加入更多异常错误逻辑
    if (exception instanceof QueryFailedError) {
      msg = exception.message;
      // if (exception.driverError.errno && exception.driverError.errno === 1062) {
      //   msg = '唯一索引冲突';
      // }
    } else if (exception instanceof BadRequestException) {
      // 处理注解的必填项校验
      const newMsg = (exception as any)?.response?.message;
      if (newMsg) {
        msg = newMsg;
      }
    } else if (
      exception instanceof MongooseError &&
      exception.message.startsWith('Cast to ObjectId failed for')
    ) {
      msg = '参数格式错误';
    }
    const responseBody = {
      headers: request.headers,
      query: request.query,
      body: request.body,
      params: request.params,
      timestamp: new Date().toISOString(),
      // 还可以加入一些用户信息
      // IP信息
      ip: requestIp.getClientIp(request),
      exception: exception['name'],
      error: msg,
    };

    this.logger.error('[all exception]', responseBody);
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}

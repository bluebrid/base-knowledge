import { Catch, ArgumentsHost, HttpException, HttpStatus, ExceptionFilter } from '../../common';
import {HttpAdapterHost } from '../../core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  // constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  // catch1(exception: unknown, host: ArgumentsHost) {
  //   console.log('-------------------------')
  //   super.catch(exception, host);
    
  // }
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest() + 'cats'),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
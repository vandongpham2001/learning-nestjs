import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const isHttp = exception instanceof HttpException;
    const isQueryError = exception instanceof QueryFailedError;

    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      isHttp
        ? exception.getResponse()
        : isQueryError ? { message: 'Database error: ' + (exception as any).message }
        : exception instanceof Error ? { message: exception.message }
        : { message: 'Internal server error' };


    const errorResponse = {
      ...(typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : exceptionResponse),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}

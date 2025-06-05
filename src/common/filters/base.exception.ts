import { HttpException, HttpStatus } from "@nestjs/common";

export interface ExceptionResponse {
  statusCode: number;
  message: string;
  errorCode?: string;
  path?: string;
  timestamp?: string;
}

export class AppException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus,
    errorCode?: string,
  ) {
    super(
      {
        statusCode: status,
        message,
        errorCode: errorCode || HttpStatus[status],
        timestamp: new Date().toISOString(),
      } as ExceptionResponse,
      status,
    );
  }
}
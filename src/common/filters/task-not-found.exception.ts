import { HttpStatus } from '@nestjs/common';
import { AppException } from './base.exception';

export class TaskNotFoundException extends AppException {
  constructor() {
    super(
      `Task not found`,
      HttpStatus.NOT_FOUND,
      'TASK_NOT_FOUND',
    );
  }
}
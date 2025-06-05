import { TaskStatus } from "src/common/enums/task-status.enum";

export class TaskResponseDto {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
}
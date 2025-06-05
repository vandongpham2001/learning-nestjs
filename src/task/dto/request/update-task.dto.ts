import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { TaskStatus } from 'src/common/enums/task-status.enum';

export class UpdateTaskDto {
  @IsNumber()
  @ApiPropertyOptional()
  id: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  @ApiPropertyOptional()
  status?: TaskStatus;
}

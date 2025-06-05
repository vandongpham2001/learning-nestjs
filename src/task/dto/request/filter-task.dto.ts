import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseFilterDto } from '../../../common/dto/request/base-filter.dto';
import { TaskStatus } from 'src/common/enums/task-status.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FilterTaskDto extends BaseFilterDto {
  @ApiPropertyOptional({ description: 'Filter by title', example: 'test' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Filter by task status' })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

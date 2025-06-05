import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  title: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description?: string;
}

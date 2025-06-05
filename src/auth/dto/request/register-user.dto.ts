import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  password: string;
}
import 'reflect-metadata';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

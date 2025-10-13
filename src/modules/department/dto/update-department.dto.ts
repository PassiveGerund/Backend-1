import 'reflect-metadata';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  title?: string;
}

import 'reflect-metadata';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

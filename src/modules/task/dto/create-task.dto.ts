import 'reflect-metadata';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
}

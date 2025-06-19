import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  task: string;
  title: string;
  description: string;
}

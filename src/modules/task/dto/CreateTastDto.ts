import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  task: string;
}

export class TaskIdDto {
  @IsNotEmpty()
  @Type(() => Number)
  id: number;
}

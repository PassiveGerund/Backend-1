import 'reflect-metadata';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  assignUser: number | null;
}

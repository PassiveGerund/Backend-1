import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class CreateTastDto {
  @IsNotEmpty()
  task: string;
}

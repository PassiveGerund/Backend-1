import 'reflect-metadata';
import { IsNotEmpty, MinLength } from 'class-validator';

export class envDto {
  @IsNotEmpty()
  @MinLength(4)
  port: number;
}

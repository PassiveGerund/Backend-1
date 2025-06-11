import 'reflect-metadata';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AppConfigDto {
  @IsNotEmpty()
  @IsNumber()
  port: number;
}

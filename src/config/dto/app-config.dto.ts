import 'reflect-metadata';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AppConfigDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  port: number;
}

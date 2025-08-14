import 'reflect-metadata';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { PostgresConfigDto } from './postgres-config.dto';

export class AppConfigDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  port: number;

  @ValidateNested()
  @Transform(({ value }) => plainToInstance(PostgresConfigDto, value))
  postgres: PostgresConfigDto;
}

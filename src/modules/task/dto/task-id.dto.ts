import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class TaskIdDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

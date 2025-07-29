import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UserIdDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

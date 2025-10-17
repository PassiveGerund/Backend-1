import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DepartmentIdDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}

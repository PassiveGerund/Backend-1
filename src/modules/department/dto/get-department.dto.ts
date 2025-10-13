import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetDepartmentDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  offset: number = 0;

  @IsString()
  @IsOptional()
  search?: string;
}

import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export enum TaskSortByEnum {
  id = 'id',
  title = 'title',
  description = 'description',
}

export enum TaskSortDirection {
  asc = 'asc',
  desc = 'desc',
}

export class PaginationDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  offset: number;

  @IsOptional()
  sortBy: TaskSortByEnum;

  @IsOptional()
  sortDirection: TaskSortDirection;
}

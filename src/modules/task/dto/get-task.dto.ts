import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum TaskSortByEnum {
  id = 'id',
  title = 'title',
  description = 'description',
  createdAt = 'createdAt',
}

export enum TaskSortDirection {
  asc = 'asc',
  desc = 'desc',
}

export class GetTaskDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  offset: number = 0;

  @IsOptional()
  @IsEnum(TaskSortByEnum)
  sortBy: TaskSortByEnum = TaskSortByEnum.id;

  @IsOptional()
  @IsEnum(TaskSortDirection)
  sortDirection: TaskSortDirection = TaskSortDirection.desc;

  @IsString()
  @IsOptional()
  search?: string;
}

import 'reflect-metadata';
import { IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsNumber()
  departmentId: number;
}

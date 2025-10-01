import { IsEmail, IsString, MinLength, IsOptional, IsIn, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;
}

export class RegisterDto {
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  first_name!: string;

  @IsString()
  @MinLength(2, { message: 'Second name must be at least 2 characters' })
  second_name!: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;

  @IsOptional()
  @IsIn(['full_access', 'limit_access', 'user'])
  role?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  first_name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Second name must be at least 2 characters' })
  second_name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password?: string;

  @IsOptional()
  @IsIn(['full_access', 'limit_access', 'user'])
  role?: string;
}

export class UserParamsDto {
  @IsNumberString({}, { message: 'User ID must be a valid number' })
  @Transform(({ value }) => parseInt(value, 10))
  userId!: number;
}
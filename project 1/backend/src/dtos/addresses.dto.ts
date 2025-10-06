import { IsEmail, IsString, MinLength, IsOptional, IsIn, IsNumberString, IsNumber } from "class-validator";
import {Transform} from 'class-transformer';


export class CreateAddressDto{
  @IsString()
  @MinLength(10, { message: 'Address line must be at least 10 characters' })
  address_line1!: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Address line must be at least 10 characters' })
  address_line2!: string;

  @IsString()
  @MinLength(5, { message: 'City must be at least 5 characters' })
  city!: string

  @IsString()
  @MinLength(2, { message: 'State must be at least 2 characters' })
  state!: string

  @IsNumber()
  @MinLength(5, { message: 'State must be at least 2 characters' })
  postal_code!: string
}
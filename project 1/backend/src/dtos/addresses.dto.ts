import { IsEmail, IsString, MinLength, IsOptional, IsIn, IsNumberString } from "class-validator";
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

  
}
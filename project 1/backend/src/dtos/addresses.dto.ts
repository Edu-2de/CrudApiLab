import { IsEmail, IsString, MinLength, IsOptional, IsIn, IsNumberString } from "class-validator";
import {Transform} from 'class-transformer';


export class CreateAddressDto{
  @IsString()
  @MinLength(10, { message: 'First name must be at least 2 characters' })
  address_line1!: string;

}
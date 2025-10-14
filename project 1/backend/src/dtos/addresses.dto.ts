import { IsEmail, IsString, MinLength, IsOptional, IsIn, IsNumberString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAddressDto {
  @IsNumber()
  @MinLength(1, { message: 'User id must be at least 1 character' })
  user_id!: number;

  @IsString()
  @MinLength(10, { message: 'Address line must be at least 10 characters' })
  address_line1!: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Address line must be at least 10 characters' })
  address_line2!: string;

  @IsString()
  @MinLength(5, { message: 'City must be at least 5 characters' })
  city!: string;

  @IsString()
  @MinLength(2, { message: 'State must be at least 2 characters' })
  state!: string;

  @IsNumber()
  @MinLength(5, { message: 'Postal code must be at least 2 characters' })
  postal_code!: string;

  @IsString()
  @MinLength(5, { message: 'Country must be at least 2 characters' })
  country!: string;
}

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Address line must be at least 10 characters' })
  address_line1!: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'Address line must be at least 10 characters' })
  address_line2!: string;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'City must be at least 5 characters' })
  city!: string;

  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'State must be at least 2 characters' })
  state!: string;

  @IsOptional()
  @IsNumber()
  @MinLength(5, { message: 'Postal code must be at least 2 characters' })
  postal_code!: string;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Country must be at least 2 characters' })
  country!: string;
}


export class AddressParamsDto {
  @IsNumberString({}, {message: 'Address ID must be a valid number'})
  @Transform(({value}) => parseInt(value, 10))
  addressId!: number;
}
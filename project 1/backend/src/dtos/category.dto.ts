import { IsString, IsUrl, IsOptional, IsBoolean, IsNumberString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsString({message: 'Title must be a string'})
  title!: string

  @IsOptional()
  @IsString({message: 'Description must be a string'})
  description!: string
}


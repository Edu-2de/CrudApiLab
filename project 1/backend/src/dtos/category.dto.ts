import { IsString, IsOptional, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsString({message: 'Title must be a string'})
  title!: string

  @IsOptional()
  @IsString({message: 'Description must be a string'})
  description!: string
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString({message: 'Title must be a string'})
  title!: string

  @IsOptional()
  @IsString({message: 'Description must be a string'})
  description!: string
}

export class CategoryParamsDto {
  @IsNumberString({}, {message: 'Category ID must be a valid number'})
  @Transform(({value}) => parseInt(value, 10))
  categoryId!: number;
}
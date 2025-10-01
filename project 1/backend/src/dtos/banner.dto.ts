import { IsString, IsUrl, IsOptional, IsBoolean, IsNumberString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBannerDto {
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  title!: string;

  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  image_url!: string;

  @IsOptional()
  @IsUrl({}, { message: 'Link URL must be a valid URL' })
  link_url?: string;
}

export class UpdateBannerDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters' })
  title?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Image URL must be a valid URL' })
  image_url?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Link URL must be a valid URL' })
  link_url?: string;

  @IsOptional()
  @IsBoolean({ message: 'Active must be a boolean value' })
  active?: boolean;
}

export class BannerParamsDto {
  @IsNumberString({}, { message: 'Banner ID must be a valid number' })
  @Transform(({ value }) => parseInt(value, 10))
  bannerId!: number;
}

export class BannerStatusDto {
  @IsBoolean({ message: 'Active status must be a boolean value' })
  active!: boolean;
}
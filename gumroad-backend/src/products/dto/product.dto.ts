import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  originalPrice?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  longDescription?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  originalPrice?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  longDescription?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsString()
  status?: string;
}

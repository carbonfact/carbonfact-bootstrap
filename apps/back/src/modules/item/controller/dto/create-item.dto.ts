import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRawMaterialDto)
  rawMaterials: CreateRawMaterialDto[];
}

export class CreateRawMaterialDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsInt()
  @Min(0)
  weight: number;
}

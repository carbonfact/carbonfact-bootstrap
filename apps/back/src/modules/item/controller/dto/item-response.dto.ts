import { IsInt, IsString, MaxLength, ValidateNested } from 'class-validator';
export class ItemResponseDto {
  @IsInt()
  id: number;
  @IsString()
  @MaxLength(30)
  name: string;
  @ValidateNested({ each: true })
  rawMaterials: RawMaterialResponseDto[];
}

export class RawMaterialResponseDto {
  @IsInt()
  id: number;
  @IsString()
  @MaxLength(30)
  name: string;
  @IsInt()
  weight: number;
}

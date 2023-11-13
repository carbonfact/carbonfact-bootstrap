import { IsInt, IsString, MaxLength } from 'class-validator';

export class RawMaterialDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsInt() // Assuming you want to validate this as well.
  weight: number;
}

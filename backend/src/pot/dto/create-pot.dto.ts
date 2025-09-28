import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePotDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  targetAmount: number;

  @IsString()
  @IsOptional()
  theme?: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

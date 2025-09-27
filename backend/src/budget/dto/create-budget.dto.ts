import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  maxSpending: number;

  @IsString()
  @IsOptional()
  theme?: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

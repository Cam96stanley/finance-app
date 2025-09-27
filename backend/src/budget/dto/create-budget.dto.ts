import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBudgetDto {
  @IsNumber()
  maxSpending: number;

  @IsString()
  @IsOptional()
  theme?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

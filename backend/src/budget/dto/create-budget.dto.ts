import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBudgetDto {
  @IsNumber()
  maxSpending: number;

  @IsString()
  @IsNotEmpty()
  theme?: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;
}

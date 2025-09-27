import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  recipientId: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}

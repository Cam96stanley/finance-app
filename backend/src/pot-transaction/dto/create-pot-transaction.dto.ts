import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PotTransactionEnum } from '../enum';

export class CreatePotTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(PotTransactionEnum, {
    message: 'type must be either DEPOSIT or WITHDRAW',
  })
  type: PotTransactionEnum;

  @IsString()
  @IsNotEmpty()
  potId: string;
}

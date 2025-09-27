import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { type CognitoUser, GetCurrentUser } from 'src/common/decorators';
import { CreateTransactionDto } from './dto';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTransaction(
    @GetCurrentUser() user: CognitoUser,
    @Body() dto: CreateTransactionDto,
  ) {
    return this.transactionService.createTransaction(user.sub, dto);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get()
  @HttpCode(HttpStatus.OK)
  getTransactions(
    @GetCurrentUser() user: CognitoUser,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.transactionService.getTransactions(user.sub, categoryId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getTransactionsForBudget(
    @GetCurrentUser() user: CognitoUser,
    budgetId: string,
  ) {
    return this.transactionService.getTransactionsForBudget(user.sub, budgetId);
  }
}

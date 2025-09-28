import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PotTransactionService } from './pot-transaction.service';
import { type CognitoUser, GetCurrentUser } from 'src/common/decorators';
import { CreatePotTransactionDto } from './dto';

@Controller('pot-transaction')
export class PotTransactionController {
  constructor(private potTransactionService: PotTransactionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPotTransaction(
    @GetCurrentUser() user: CognitoUser,
    @Body() dto: CreatePotTransactionDto,
  ) {
    return this.potTransactionService.createPotTransaction(user.sub, dto);
  }
}

import { Module } from '@nestjs/common';
import { PotTransactionService } from './pot-transaction.service';
import { PotTransactionController } from './pot-transaction.controller';

@Module({
  providers: [PotTransactionService],
  controllers: [PotTransactionController]
})
export class PotTransactionModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { BudgetModule } from './budget/budget.module';
import { TransactionModule } from './transaction/transaction.module';
import { PotModule } from './pot/pot.module';
import { PotTransactionModule } from './pot-transaction/pot-transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    BudgetModule,
    TransactionModule,
    PotModule,
    PotTransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

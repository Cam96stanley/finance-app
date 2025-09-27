import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(sub: string, dto: CreateTransactionDto) {
    const user = await this.prisma.user.findUnique({
      where: { cognitoSub: sub },
    });

    if (!user) throw new Error('No user found');

    return this.prisma.transaction.create({
      data: {
        amount: dto.amount,
        senderId: user.id,
        recipientId: dto.recipientId,
        categoryId: dto.categoryId,
      },
      include: {
        recipient: { select: { name: true } },
        category: { select: { name: true } },
      },
    });
  }
}

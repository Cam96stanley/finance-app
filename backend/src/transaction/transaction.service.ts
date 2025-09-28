import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    const budget = await this.prisma.budget.findFirst({
      where: {
        userId: user.id,
        categoryId: dto.categoryId,
      },
    });

    if (budget) {
      if (budget.maxSpending < dto.amount) {
        throw new BadRequestException(
          'Insufficient budget for this transaction',
        );
      }

      const [updatedBudget, transaction] = await this.prisma.$transaction([
        this.prisma.budget.update({
          where: { id: budget.id },
          data: {
            maxSpending: { decrement: dto.amount },
          },
        }),
        this.prisma.transaction.create({
          data: {
            amount: dto.amount,
            senderId: user.id,
            recipientId: dto.recipientId,
            categoryId: dto.categoryId,
          },
          include: {
            sender: { select: { name: true } },
            recipient: { select: { name: true } },
            category: { select: { name: true } },
          },
        }),
      ]);

      return { transaction, updatedBudget };
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        amount: dto.amount,
        senderId: user.id,
        recipientId: dto.recipientId,
        categoryId: dto.categoryId,
      },
      include: {
        sender: { select: { name: true } },
        recipient: { select: { name: true } },
        category: { select: { name: true } },
      },
    });

    return { transaction };
  }

  async getTransactions(sub: string, categoryId?: string) {
    const user = await this.prisma.user.findUnique({
      where: { cognitoSub: sub },
    });

    if (!user) throw new NotFoundException('No user found');

    return this.prisma.transaction.findMany({
      where: {
        senderId: user.id,
        ...(categoryId && { categoryId }),
      },
      include: {
        recipient: { select: { name: true } },
        category: { select: { name: true } },
      },
    });
  }
}

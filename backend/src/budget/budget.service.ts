import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBudgetDto } from './dto';

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  async createBudget(dto: CreateBudgetDto) {
    return this.prisma.budget.create({
      data: {
        maxSpending: dto.maxSpending,
        theme: dto.theme,
        userId: dto.userId,
        categoryId: dto.categoryId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}

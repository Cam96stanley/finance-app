import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBudgetDto, UpdateBudgetDto } from './dto';

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  async createBudget(dto: CreateBudgetDto) {
    return this.prisma.budget.create({
      data: {
        name: dto.name,
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

  async updateBudget(budgetId: string, dto: UpdateBudgetDto) {
    return this.prisma.budget.update({
      where: { id: budgetId },
      data: {
        ...dto,
      },
      include: {
        user: { select: { name: true } },
        category: { select: { name: true } },
      },
    });
  }

  async getUserBudgets(userId: string) {
    console.log(userId);
    return this.prisma.budget.findMany({
      where: { userId },
      include: {
        user: { select: { name: true } },
        category: { select: { name: true } },
      },
    });
  }
}

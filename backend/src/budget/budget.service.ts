import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateBudgetDto } from './dto';

@Injectable()
export class BudgetService {
  constructor(private prisma: PrismaService) {}

  // async createBudget(dto: CreateBudgetDto) {}
}

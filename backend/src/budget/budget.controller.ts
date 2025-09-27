import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto';

@Controller('budget')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Post('create-budget')
  @HttpCode(HttpStatus.CREATED)
  createBudget(@Body() dto: CreateBudgetDto) {
    return this.budgetService.createBudget(dto);
  }
}

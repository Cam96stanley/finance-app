import { Body, Controller } from '@nestjs/common';
import { BudgetService } from './budget.service';
// import { CreateBudgetDto } from './dto';

@Controller('budget')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  // createBudget(@Body() dto: CreateBudgetDto) {
  //   // return this.budgetService.createBudget(dto);
  // }
}

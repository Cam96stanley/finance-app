import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto } from './dto';
import { type CognitoUser, GetCurrentUser } from 'src/common/decorators';

@Controller('budget')
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Post('create-budget')
  @HttpCode(HttpStatus.CREATED)
  createBudget(@Body() dto: CreateBudgetDto) {
    return this.budgetService.createBudget(dto);
  }

  @Patch(':budgetId')
  @HttpCode(HttpStatus.OK)
  updateBudget(
    @Param('budgetId') budgetId: string,
    @Body() dto: UpdateBudgetDto,
  ) {
    return this.budgetService.updateBudget(budgetId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getUserBudgets(@GetCurrentUser() user: CognitoUser) {
    return this.budgetService.getUserBudgets(user.sub);
  }
}

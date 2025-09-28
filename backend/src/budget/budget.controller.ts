import {
  Body,
  Controller,
  Delete,
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
  createBudget(
    @GetCurrentUser() user: CognitoUser,
    @Body() dto: CreateBudgetDto,
  ) {
    return this.budgetService.createBudget(user.sub, dto);
  }

  @Patch(':budgetId')
  @HttpCode(HttpStatus.OK)
  updateBudget(
    @GetCurrentUser() user: CognitoUser,
    @Param('budgetId') budgetId: string,
    @Body() dto: UpdateBudgetDto,
  ) {
    return this.budgetService.updateBudget(user.sub, budgetId, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getUserBudgets(@GetCurrentUser() user: CognitoUser) {
    return this.budgetService.getUserBudgets(user.sub);
  }

  @Get(':budgetId')
  @HttpCode(HttpStatus.OK)
  getBudget(
    @Param('budgetId') budgetId: string,
    @GetCurrentUser() user: CognitoUser,
  ) {
    return this.budgetService.getBudget(budgetId, user.sub);
  }

  @Delete(':budgetId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteBudget(
    @Param('budgetId') budgetId: string,
    @GetCurrentUser() user: CognitoUser,
  ) {
    return this.budgetService.deleteBudget(user.sub, budgetId);
  }
}

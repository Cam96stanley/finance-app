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
import { PotService } from './pot.service';
import { CreatePotDto, UpdatePotDto } from './dto';
import { type CognitoUser, GetCurrentUser } from 'src/common/decorators';

@Controller('pot')
export class PotController {
  constructor(private potService: PotService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPot(@GetCurrentUser() user: CognitoUser, @Body() dto: CreatePotDto) {
    return this.potService.createPot(user.sub, dto);
  }

  @Patch(':potId')
  @HttpCode(HttpStatus.OK)
  updaetPot(
    @Param('potId') potId: string,
    @GetCurrentUser() user: CognitoUser,
    @Body() dto: UpdatePotDto,
  ) {
    return this.potService.updatePot(potId, user.sub, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getPots(@GetCurrentUser() user: CognitoUser) {
    return this.potService.getPots(user.sub);
  }
}

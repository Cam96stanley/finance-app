import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PotService } from './pot.service';
import { CreatePotDto } from './dto';
import { type CognitoUser, GetCurrentUser } from 'src/common/decorators';

@Controller('pot')
export class PotController {
  constructor(private potService: PotService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPot(@GetCurrentUser() user: CognitoUser, @Body() dto: CreatePotDto) {
    return this.potService.createPot(user.sub, dto);
  }
}

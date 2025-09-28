import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePotTransactionDto } from './dto';
import { PotTransactionEnum } from './enum';

@Injectable()
export class PotTransactionService {
  constructor(private prisma: PrismaService) {}

  async createPotTransaction(sub: string, dto: CreatePotTransactionDto) {
    const user = await this.prisma.user.findUnique({
      where: { cognitoSub: sub },
    });

    if (!user) throw new NotFoundException('No user found');

    const pot = await this.prisma.pot.findUnique({
      where: { id: dto.potId },
    });

    if (!pot) throw new NotFoundException('No pot found');

    let newTotal = pot.runningTotal;
    if (dto.type === PotTransactionEnum.DEPOSIT) {
      newTotal += dto.amount;
    } else if (dto.type === PotTransactionEnum.WITHRAW) {
      if (pot.runningTotal < dto.amount) {
        throw new BadRequestException('Insufficient funds in pot');
      }
      newTotal -= dto.amount;
    }

    try {
      const [transaction, updatedPot] = await this.prisma.$transaction([
        this.prisma.potTransaction.create({
          data: {
            amount: dto.amount,
            type: dto.type,
            potId: pot.id,
            userId: user.id,
          },
        }),
        this.prisma.pot.update({
          where: { id: dto.potId },
          data: { runningTotal: newTotal },
        }),
      ]);

      return { transaction, updatedPot };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
      throw new BadRequestException('Unknown error creating pot transaction');
    }
  }
}

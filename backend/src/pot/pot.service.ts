import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePotDto } from './dto';

@Injectable()
export class PotService {
  constructor(private prisma: PrismaService) {}

  async createPot(sub: string, dto: CreatePotDto) {
    const user = await this.prisma.user.findUnique({
      where: { cognitoSub: sub },
    });

    if (!user) throw new NotFoundException('No user found');

    return this.prisma.pot.create({
      data: {
        name: dto.name,
        targetAmount: dto.targetAmount,
        userId: user.id,
        theme: dto.theme,
        categoryId: dto.categoryId,
      },
    });
  }

  async getPots(sub: string) {
    const user = await this.prisma.user.findUnique({
      where: { cognitoSub: sub },
    });

    if (!user) throw new NotFoundException('No user found');

    return this.prisma.pot.findMany({
      where: { userId: user.id },
    });
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { PotTransactionController } from './pot-transaction.controller';

describe('PotTransactionController', () => {
  let controller: PotTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PotTransactionController],
    }).compile();

    controller = module.get<PotTransactionController>(PotTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

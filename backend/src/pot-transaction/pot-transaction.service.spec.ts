import { Test, TestingModule } from '@nestjs/testing';
import { PotTransactionService } from './pot-transaction.service';

describe('PotTransactionService', () => {
  let service: PotTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PotTransactionService],
    }).compile();

    service = module.get<PotTransactionService>(PotTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

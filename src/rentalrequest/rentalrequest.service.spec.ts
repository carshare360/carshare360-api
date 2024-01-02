import { Test, TestingModule } from '@nestjs/testing';
import { RentalrequestService } from './rentalrequest.service';

describe('RentalrequestService', () => {
  let service: RentalrequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentalrequestService],
    }).compile();

    service = module.get<RentalrequestService>(RentalrequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

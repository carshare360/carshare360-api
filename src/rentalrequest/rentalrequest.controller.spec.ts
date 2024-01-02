import { Test, TestingModule } from '@nestjs/testing';
import { RentalrequestController } from './rentalrequest.controller';
import { RentalrequestService } from './rentalrequest.service';

describe('RentalrequestController', () => {
  let controller: RentalrequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalrequestController],
      providers: [RentalrequestService],
    }).compile();

    controller = module.get<RentalrequestController>(RentalrequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

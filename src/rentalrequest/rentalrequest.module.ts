import { Module } from '@nestjs/common';
import { RentalrequestService } from './rentalrequest.service';
import { RentalrequestController } from './rentalrequest.controller';

@Module({
  controllers: [RentalrequestController],
  providers: [RentalrequestService],
})
export class RentalrequestModule {}

import { Module } from '@nestjs/common';
import { RentalrequestService } from './rentalrequest.service';
import { RentalrequestController } from './rentalrequest.controller';
import { Rentalrequest } from './entities/rentalrequest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Rentalrequest])],
  controllers: [RentalrequestController],
  providers: [RentalrequestService],
})
export class RentalrequestModule {}

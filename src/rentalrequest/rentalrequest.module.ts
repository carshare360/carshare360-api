import { Module } from '@nestjs/common';
import { RentalrequestService } from './rentalrequest.service';
import { RentalrequestController } from './rentalrequest.controller';
import { Rentalrequest } from './entities/rentalrequest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/entities/user.entity';
import { Alert } from 'src/alerts/entities/alert.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Rentalrequest, User, Alert])],
  controllers: [RentalrequestController],
  providers: [RentalrequestService],
})
export class RentalrequestModule {}

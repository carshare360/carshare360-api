import { Module } from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { VehicleController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehiclesModule {}

import { Module } from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { VehicleController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    MulterModule.register(),
  ],
  controllers: [VehicleController],
  providers: [VehicleService],
  
})
export class VehiclesModule {}

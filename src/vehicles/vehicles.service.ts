import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  create(createCarDto: CreateVehicleDto): Promise<Vehicle> {
    const car = this.vehicleRepository.create(createCarDto);
    car.location = { type: 'Point', coordinates: [createCarDto.longitude, createCarDto.latitude] };
    return this.vehicleRepository.save(car);
  }

  findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find();
  }

  findOne(id: number): Promise<Vehicle> {
    return this.vehicleRepository.findOne(
      {
        where: {
        id
      }
    }
    );
  }

  async update(id: number, updateCarDto: UpdateVehicleDto): Promise<Vehicle> {
    const car = await this.vehicleRepository.preload({
      id: id,
      ...updateCarDto,
    });
    if (!car) {
      throw new Error(`Car #${id} not found`);
    }
    return this.vehicleRepository.save(car);
  }

  async remove(id: number): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
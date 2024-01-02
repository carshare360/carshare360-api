import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Vehicle) 
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async generateFakeData() {
    const count = await this.vehicleRepository.count();


    if (count == 0) {
      const vehicles = [];
      for(let i = 0; i < 100; i++) {
        const vehicle = new Vehicle();
        vehicle.title = `Vehicle ${i}`;
        vehicle.description = `Vehicle ${i} description`;
        vehicle.ownerId = 1;
        vehicle.brand = 'Toyota';
        vehicle.model = 'Corolla';
        vehicle.year = 2010;
        vehicle.location = {
          type: 'Point',
          // random coordinates generate with random
          coordinates: [randomInt(1, 100), randomInt(1, 100)],
        };
        vehicle.engineType = 'Gasoline';
        vehicle.transmissionType = 'Automatic';
        vehicle.mileage = 100000;
        vehicle.pricePerHour = 50;
        vehicle.photo = 'https://via.placeholder.com/500';
        vehicle.rentPerHour = randomInt(1, 10);
        vehicles.push(vehicle);
      }

      const result = await this.vehicleRepository.save(vehicles);
      console.log(result);
      return { message: 'Fake data generated.', result };
      
    }
    
   

  }
}

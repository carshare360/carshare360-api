import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Polygon, Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { LatLng, SearchVehicleDto } from './dto/search-vehicle.dto';
import { randomUUID } from 'crypto';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  create(image: Express.Multer.File, createCarDto: CreateVehicleDto): Promise<Vehicle> {
    const car = this.vehicleRepository.create(createCarDto);
    car.isAvailable = true;
    car.location = {
      type: 'Point',
      coordinates: [createCarDto.longitude, createCarDto.latitude],
    };
    car.photo = randomUUID() + '.jpg';
    writeFileSync(join(__dirname, '..', '..', '..', 'uploads', car.photo), image.buffer);
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

  async search(searchVehicleDto: SearchVehicleDto): Promise<Vehicle[]> {
    const boundingBox = this.createBoundingBox(searchVehicleDto.NE, searchVehicleDto.SW);

    const vehiclesInSearchArea = await this.vehicleRepository
    .createQueryBuilder('vehicle')
    .where(`ST_Within(vehicle.location::geometry, ST_GeomFromGeoJSON(:boundingBox)::geometry)`)
    .setParameter('boundingBox', JSON.stringify(boundingBox))
    .getMany();

    return vehiclesInSearchArea;
  }

  private createBoundingBox(NE: LatLng, SW: LatLng): Polygon {
    const epsilon = 0.000001;

    const minX = Math.min(NE.longitude, SW.longitude) - epsilon;
    const minY = Math.min(NE.latitude, SW.latitude) - epsilon;
    const maxX = Math.max(NE.longitude, SW.longitude) + epsilon;
    const maxY = Math.max(NE.latitude, SW.latitude) + epsilon;

    return {
      type: 'Polygon',
      coordinates: [
        [
          [minX, minY],
          [minX, maxY],
          [maxX, maxY],
          [maxX, minY],
          [minX, minY],
        ],
      ],
    };
  }


  multiCreate(createCarDto: CreateVehicleDto[]): Promise<Vehicle[]> {
    const cars = createCarDto.map((carDto) => {
      const car = this.vehicleRepository.create(carDto);
      car.isAvailable = true;
      car.location = {
        type: 'Point',
        coordinates: [carDto.longitude, carDto.latitude],
      };
      return car;
    });
    return this.vehicleRepository.save(cars);
  }
}

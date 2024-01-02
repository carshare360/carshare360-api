import { Entity, Column, PrimaryGeneratedColumn, Point, Check } from 'typeorm';

@Entity({name: 'vehicles'})
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  ownerId: number;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Point;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  @Check(`"year" > 1900 AND "year" <= EXTRACT(YEAR FROM CURRENT_DATE) + 1`)
  year: number;

  @Column()
  engineType: string;

  @Column({ type: 'enum', enum: ['Automatic', 'Manual', 'Semi-Automatic'] })
  transmissionType: string; // Enum tipi için özel bir işlem yapılabilir

  @Column()
  @Check(`"mileage" >= 0`)
  mileage: number;

  @Column()
  @Check(`"pricePerHour" >= 0`)
  pricePerHour: number;

  @Column()
  photo: string;

  @Column()
  rentPerHour: number;

  @Column({ default: true })
  isAvailable: boolean;
}

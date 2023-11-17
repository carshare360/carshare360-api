import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column()
  location: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: string;

  @Column()
  engineType: string;

  @Column()
  transmissionType: string; // Enum tipi için özel bir işlem yapılabilir

  @Column()
  mileage: string;

  @Column()
  pricePerHour: string;

  @Column()
  photo: string;

  @Column()
  isAvailable: boolean;
}
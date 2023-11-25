import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'The owner ID of the vehicle',
    example: 123,
  })
  ownerId: number;

  @ApiProperty({
    description: 'The location ID of the vehicle',
    example: 456,
  })
  location: number;

  @ApiProperty({
    description: 'The brand of the vehicle',
    example: 'Toyota',
  })
  brand: string;

  @ApiProperty({
    description: 'The model of the vehicle',
    example: 'Corolla',
  })
  model: string;

  @ApiProperty({
    description: 'The manufacturing year of the vehicle',
    example: '2021',
  })
  year: string;

  @ApiProperty({
    description: 'The engine type of the vehicle',
    example: 'Hybrid',
  })
  engineType: string;

  @ApiProperty({
    description: 'The transmission type of the vehicle',
    example: 'Automatic',
    enum: ['Automatic', 'Manual', 'Semi-Automatic'], // Enum değerlerini buraya ekleyin
  })
  transmissionType: string;

  @ApiProperty({
    description: 'The mileage of the vehicle',
    example: '10000',
  })
  mileage: string;

  @ApiProperty({
    description: 'The price per hour for renting the vehicle',
    example: '15',
  })
  pricePerHour: string;

  @ApiProperty({
    description: 'The URL of the vehicle photo',
    example: 'http://example.com/photo.jpg',
  })
  photo: string;

  @ApiProperty({
    description: 'Availability of the vehicle',
    example: true,
  })
  isAvailable: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateVehicleDto {
  @IsNumber()
  @ApiProperty({
    description: 'The owner ID of the vehicle',
    example: 123,
  })
  ownerId: number;

  @IsNumber()
  @Min(-90)
  @Max(90)
  @ApiProperty({
    description: 'The latitude of the vehicle location',
    example: 90,
  })
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  @ApiProperty({
    description: 'The longitude of the vehicle location',
    example: 180,
  })
  longitude: number;

  @IsString()
  @Length(3, 255)
  @ApiProperty({
    description: 'The brand of the vehicle',
    example: 'Toyota',
  })
  brand: string;

  @IsString()
  @Length(3, 255)
  @ApiProperty({
    description: 'The model of the vehicle',
    example: 'Corolla',
  })
  model: string;

  //TODO: convert to number
  @ApiProperty({
    description: 'The manufacturing year of the vehicle',
    example: '2021',
  })
  year: string;

  @IsString()
  @Length(3, 255)
  @ApiProperty({
    description: 'The engine type of the vehicle',
    example: 'Hybrid',
  })
  engineType: string;

  @IsEnum(['Automatic', 'Manual', 'Semi-Automatic'], {
    message: 'Transmission type must be Automatic, Manual or Semi-Automatic',
  })
  @ApiProperty({
    description: 'The transmission type of the vehicle',
    example: 'Automatic',
    enum: ['Automatic', 'Manual', 'Semi-Automatic'], // Enum değerlerini buraya ekleyin
  })
  transmissionType: string;

  //TODO: convert to number
  @ApiProperty({
    description: 'The mileage of the vehicle',
    example: '10000',
  })
  mileage: string;

  //TODO: convert to number
  @ApiProperty({
    description: 'The price per hour for renting the vehicle',
    example: '15',
  })
  pricePerHour: string;

  @IsString()
  @ApiProperty({
    description: 'The URL of the vehicle photo',
    example: 'http://example.com/photo.jpg',
  })
  photo: string;
}

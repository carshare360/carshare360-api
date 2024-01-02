import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateVehicleDto {
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    description: 'The owner ID of the vehicle',
    example: 123,
  })
  ownerId: number;

  @IsNumber()
  @Type(() => Number)
  @Min(-90)
  @Max(90)
  @ApiProperty({
    description: 'The latitude of the vehicle location',
    example: 90,
  })
  latitude: number;

  @IsNumber()
  @Type(() => Number)
  @Min(-180)
  @Max(180)
  @ApiProperty({
    description: 'The longitude of the vehicle location',
    example: 180,
  })
  longitude: number;

  @IsString()
  @Type(() => String)
  @Length(3, 255)
  @ApiProperty({
    description: 'The brand of the vehicle',
    example: 'Toyota',
  })
  brand: string;

  @IsString()
  @Type(() => String)
  @Length(3, 255)
  @ApiProperty({
    description: 'The model of the vehicle',
    example: 'Corolla',
  })
  model: string;

  @IsNumber()
  @Type(() => Number)
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  @ApiProperty({
    description: 'The manufacturing year of the vehicle',
    example: '2021',
  })
  year: number;

  @IsString()
  @Type(() => String)
  @Length(3, 255)
  @ApiProperty({
    description: 'The engine type of the vehicle',
    example: 'Hybrid',
  })
  engineType: string;

  @IsEnum(['Automatic', 'Manual', 'Semi-Automatic'], {
    message: 'Transmission type must be Automatic, Manual or Semi-Automatic',
  })
  @Type(() => String)
  @ApiProperty({
    description: 'The transmission type of the vehicle',
    example: 'Automatic',
    enum: ['Automatic', 'Manual', 'Semi-Automatic'], // Enum değerlerini buraya ekleyin
  })
  transmissionType: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @ApiProperty({
    description: 'The mileage of the vehicle',
    example: '10000',
  })
  mileage: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @ApiProperty({
    description: 'The price per hour for renting the vehicle',
    example: '15',
  })
  pricePerHour: number;

  @ApiProperty({ type:'string', format:'binary' })
  file: Express.Multer.File;
}

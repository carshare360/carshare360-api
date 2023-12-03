import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class LatLng {
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
};

export class SearchVehicleDto {
  @ApiProperty({
    description: 'The Northeast corner of the search area',
    example: {
      latitude: 90,
      longitude: 180,
    },
  })
  NE: LatLng;

  @ApiProperty({
    description: 'The Southwest corner of the search area',
    example: {
      latitude: -90,
      longitude: -180,
    },
  })
  SW: LatLng;
}
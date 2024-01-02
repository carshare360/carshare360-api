import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateRentalrequestDto {
    @IsNumber()
    @ApiProperty(
        {
            type: Number,
            description: 'The id of the vehicle to rent',
            example: 1,
            required: true,
        },
    )
    vehicleId: number;

    @ApiProperty(
        {
            type: Date,
            description: 'The start date of the rental',
            example: '2021-01-01',
            required: true,
        },
    )
    startDate: Date;

    @ApiProperty(
        {
            type: Date,
            description: 'The end date of the rental',
            example: '2021-01-01',
            required: true,
        },
    )
    endDate: Date;

    @ApiProperty(
        {
            type: String,
            description: 'The description of the rental request',
            example: 'I want to rent this vehicle',
            required: true,
        },
    )
    description: string;
}

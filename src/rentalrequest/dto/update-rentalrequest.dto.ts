import { PartialType } from '@nestjs/swagger';
import { CreateRentalrequestDto } from './create-rentalrequest.dto';

export class UpdateRentalrequestDto extends PartialType(CreateRentalrequestDto) {}

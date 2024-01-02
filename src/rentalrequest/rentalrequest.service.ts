import { Injectable } from '@nestjs/common';
import { CreateRentalrequestDto } from './dto/create-rentalrequest.dto';
import { UpdateRentalrequestDto } from './dto/update-rentalrequest.dto';

@Injectable()
export class RentalrequestService {
  create(createRentalrequestDto: CreateRentalrequestDto) {
    return 'This action adds a new rentalrequest';
  }

  findAll() {
    return `This action returns all rentalrequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rentalrequest`;
  }

  update(id: number, updateRentalrequestDto: UpdateRentalrequestDto) {
    return `This action updates a #${id} rentalrequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} rentalrequest`;
  }
}

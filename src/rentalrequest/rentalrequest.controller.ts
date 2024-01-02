import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentalrequestService } from './rentalrequest.service';
import { CreateRentalrequestDto } from './dto/create-rentalrequest.dto';
import { UpdateRentalrequestDto } from './dto/update-rentalrequest.dto';

@Controller('rentalrequest')
export class RentalrequestController {
  constructor(private readonly rentalrequestService: RentalrequestService) {}

  @Post()
  create(@Body() createRentalrequestDto: CreateRentalrequestDto) {
    return this.rentalrequestService.create(createRentalrequestDto);
  }

  @Get()
  findAll() {
    return this.rentalrequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalrequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalrequestDto: UpdateRentalrequestDto) {
    return this.rentalrequestService.update(+id, updateRentalrequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalrequestService.remove(+id);
  }
}

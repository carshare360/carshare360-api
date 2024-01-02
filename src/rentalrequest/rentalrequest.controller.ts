import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { RentalrequestService } from './rentalrequest.service';
import { CreateRentalrequestDto } from './dto/create-rentalrequest.dto';
import { UpdateRentalrequestDto } from './dto/update-rentalrequest.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Public } from 'src/auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { use } from 'passport';

@ApiTags('Rental Request')
@Controller('rentalrequest')
export class RentalrequestController {
  private readonly logger = new Logger(RentalrequestController.name);
  constructor(private readonly rentalrequestService: RentalrequestService) {}

  @Post()
  create(@CurrentUser() currentUser, @Body() createRentalrequestDto: CreateRentalrequestDto) {
    if(currentUser?.sub == undefined) throw new Error("User not logged in");
    return this.rentalrequestService.create(currentUser.sub, createRentalrequestDto);
  }

  @Post('accept/:rentalRequestId')
  accept(@Param('rentalRequestId') rentalRequestId: number) {
    return this.rentalrequestService.accept(rentalRequestId);
  }

  @Post('reject/:rentalRequestId')
  reject(@Param('rentalRequestId') rentalRequestId: number) {
    return this.rentalrequestService.reject(rentalRequestId);
  }

  
  @Get('my-ad-requests')
  async getMyAdRequests(@CurrentUser() user) {
    this.logger.log('Fetching my rental for user ' + user.sub);
    return this.rentalrequestService.getMyAdRequest(user.sub);
  }

  @Get('my-requests')
  async getMyRequests(@CurrentUser() user) {
    this.logger.log('Fetching rental requests for user ' + user.sub);
    return this.rentalrequestService.getMyRequest(user.sub);
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

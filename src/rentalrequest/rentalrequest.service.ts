import { Injectable, Logger } from '@nestjs/common';
import { CreateRentalrequestDto } from './dto/create-rentalrequest.dto';
import { UpdateRentalrequestDto } from './dto/update-rentalrequest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rentalrequest } from './entities/rentalrequest.entity';
import { Repository } from 'typeorm';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Injectable()
export class RentalrequestService {
  private readonly logger = new Logger(RentalrequestService.name);

  constructor(
    @InjectRepository(Rentalrequest)
    private rentalrequestRepository: Repository<Rentalrequest>,    
    
  ) {}

  async getMyAdRequest(userId: number): Promise<Rentalrequest[]> {
    this.logger.log('Retrieving rental requests for user ' + userId);
    return this.rentalrequestRepository.find({ where: { vehicle: { ownerId: userId } }, relations: ['vehicle'] });
  }

  async getMyRequest(userId: number): Promise<Rentalrequest[]> {
    this.logger.log('Retrieving rental requests for user ' + userId);
    return this.rentalrequestRepository.find({ where: { user: { id: userId } }, relations: ['vehicle'] });
  }

  async create(userId: number, createRentalrequestDto: CreateRentalrequestDto) {

    const rentalrequest = await this.rentalrequestRepository.create({
      description: createRentalrequestDto.description,
      startDate: createRentalrequestDto.startDate,
      endDate: createRentalrequestDto.endDate,
      vehicle: { id: createRentalrequestDto.vehicleId },
      user: { id: userId },
    });
    return this.rentalrequestRepository.save(rentalrequest);
  }

  accept(rentalRequestId: number) {
    this.rentalrequestRepository.update({ id: rentalRequestId }, { status: Status.Approved });  
  }

  reject(rentalRequestId: number) {
    this.rentalrequestRepository.update({ id: rentalRequestId } , { status: Status.Rejected });  
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

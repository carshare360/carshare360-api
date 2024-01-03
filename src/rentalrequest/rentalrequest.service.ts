import { Injectable, Logger } from '@nestjs/common';
import { CreateRentalrequestDto } from './dto/create-rentalrequest.dto';
import { UpdateRentalrequestDto } from './dto/update-rentalrequest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rentalrequest } from './entities/rentalrequest.entity';
import { Repository } from 'typeorm';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { User } from 'src/users/entities/user.entity';
import { Status } from './dto/status.enum';

@Injectable()
export class RentalrequestService {
  private readonly logger = new Logger(RentalrequestService.name);

  constructor(
    @InjectRepository(Rentalrequest)
    private rentalrequestRepository: Repository<Rentalrequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
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
    this.rentalrequestRepository.findOne({ where: { id: rentalRequestId }, relations: ['vehicle'] }).then((rentalrequest) => {
      this.rentalrequestRepository.update({ vehicle: { id: rentalrequest.vehicle.id  }  }, { status: Status.Canceled }); 

      this.rentalrequestRepository.find({ where: { vehicle: { id: rentalrequest.vehicle.id } }, relations: ['user'] }).then((rentalrequests) => {
        rentalrequests.forEach((rentalrequest) => {
          //notify other renters
          if(rentalrequest.id == rentalRequestId){
            rentalrequest.user.alerts.push({
              id: 0, // Add the 'id' property with a default value
              description: 'Your rental request has been accepted',
              rentalrequest: rentalrequest,
              status: Status.Approved,
              user: rentalrequest.user
            });
          } 
          else {
            rentalrequest.user.alerts.push({
              id: 0, // Add the 'id' property with a default value
              description: 'Your rental request has been rejected',
              rentalrequest: rentalrequest,
              status: Status.Rejected,
              user: rentalrequest.user
            });
          }
        });

        //notify owner
        this.userRepository.findOne({ where: { id: rentalrequest.vehicle.ownerId } }).then((owner) => {
          owner.alerts.push({
            id: 0, // Add the 'id' property with a default value
            description: 'You approved a rental request',
            rentalrequest: rentalrequest,
            status: Status.Approved,
            user: owner
          });
          this.userRepository.save(owner);
        });
      });

      rentalrequest.status = Status.Approved;
      this.rentalrequestRepository.save(rentalrequest);      
    });
  }

  reject(rentalRequestId: number) {
    this.rentalrequestRepository.update({ id: rentalRequestId } , { status: Status.Rejected });  
    this.rentalrequestRepository.findOne({where: {id: rentalRequestId}, relations: ['user']}).then((rentalrequest) => {
      rentalrequest.user.alerts.push({
        id: 0, // Add the 'id' property with a default value
        description: 'Your rental request has been rejected',
        rentalrequest: rentalrequest,
        status: Status.Rejected,
        user: rentalrequest.user
      });
      this.userRepository.save(rentalrequest.user);
    });
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

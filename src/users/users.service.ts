import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Alert } from 'src/alerts/entities/alert.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id:number) {  
    const user: User = await this.userRepository.findOne({where: {id: id}}  );
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    const result = (({ firstName, lastName, phoneNumber, about }) => ({ firstName, lastName, phoneNumber, about }))(user);

    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // First, check if the user exists
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Attempt to update the user
    try {
      await this.userRepository.update({ id }, updateUserDto);

      // After updating, return the updated user data
      const updatedUser = await this.userRepository.findOne({ where: { id } });
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found after update`);
      }
      const result = (({ firstName, lastName, phoneNumber, about }) => ({ firstName, lastName, phoneNumber, about }))(updatedUser);

      return result;
    } catch (error) {
      // Handle any other errors
      throw new BadRequestException('Update operation failed');
    }
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getAlerts(id: number) {
    return (await this.userRepository.findOne({where: {id: id}, relations: ['alerts', 'alerts.rentalrequest', 'alerts.rentalrequest.vehicle']})).alerts;
  }

  async deleteAlerts(id: number) {
    const user = await this.userRepository.findOne({where: {id: id}, relations: ['alerts']});
    this.alertRepository.remove(user.alerts);
  }
}

import { BadRequestException, Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CurrentUser } from "./current-user.decorator";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Roles } from "./roles.decorator";
import { Role } from "./role.enum";
import { RolesGuard } from "./roles.guard";
import { Public } from "./public.decorator";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) { }

  @Post('login')
  
  async login(@CurrentUser() user: User) {
    return {
      userId: user.id,
      token: this.authService.getTokenForUser(user)
    }
  }
  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = new User();

    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException(['Passwords are not identical']);
    }

    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email }
      ]
    });

    if (existingUser) {
      throw new BadRequestException(['email is already taken']);
    }

    user.password = await this.authService.hashPassword(createUserDto.password);
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return {
      ...(await this.userRepository.save(user)),
      token: this.authService.getTokenForUser(user)
    }
  }


  @Get('profile')
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }
}

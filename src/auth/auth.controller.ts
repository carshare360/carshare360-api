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
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDTo } from "./dto/login-response.dto";
import { ApiTags } from "@nestjs/swagger";


  
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) { }


  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDTo> {
    const user = await this.userRepository.findOne({
      where: [
        { email: loginDto.email }
      ]
    });

    if (!user) {
      throw new BadRequestException(['email or password is incorrect']);
    }

    if (!await this.authService.comparePasswords(loginDto.password, user.password)) {
      throw new BadRequestException(['email or password is incorrect']);
    }

    const { password, ...result } = user;
    return {
      ...result,
      token: this.authService.getTokenForUser(user)
    }
   }



  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<LoginResponseDTo> {
    const user = new User();

    if (createUserDto.password !== createUserDto.retypedPassword) {
      throw new BadRequestException({code: "passwords_not_matching"});
    }

    const existingUser = await this.userRepository.findOne({
      where: [
        { email: createUserDto.email }
      ]
    });

    if (existingUser) {
      throw new BadRequestException({code: "email_already_registered"});
    }

    user.password = await this.authService.hashPassword(createUserDto.password);
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    const {password, ...result} = await this.userRepository.save(user)

    return {  
      ...result,
      token: this.authService.getTokenForUser(user)
    }
  }

  @Public()
  @Post('validate-email')
  async checkRegisteredEmail(@Body() body: { email: string }): Promise<{}> {
    if(body.email === undefined) throw new BadRequestException({code: "invalid_email"});
    const existingUser = await this.userRepository.findOne({
      where: [
        { email: body.email }
      ]
    });

    if(existingUser)
    {
      throw new BadRequestException({code: "email_already_registered"})
    }
    return {};
  }

  // !TODO implement this
  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: { email: string }) {
    const user = await this.userRepository.findOne({
      where: [
        { email: forgotPasswordDto.email }
      ]
    });

    if (!user) {
      throw new BadRequestException(['email not found']);
    }

    await this.authService.sendPasswordResetEmail(user.email);

    return {
      message: 'Password reset email sent'
    }
      
    }

  @Get('profile')
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }


  @Post('add-blacklist')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async addBlacklistByEmail(@Body() body: { email: string }) {
    const user = await this.userRepository.findOne({
      where: [
        { email: body.email }
      ]
    });

    if (!user) {
      throw new BadRequestException(['Email not found']);
    }

    user.blacklisted = true;
    await this.userRepository.save(user);

    return {
      message: 'User blacklisted'
    }
  }
}

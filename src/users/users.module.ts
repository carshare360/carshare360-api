import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Alert } from 'src/alerts/entities/alert.entity';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([User, Alert]),

  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

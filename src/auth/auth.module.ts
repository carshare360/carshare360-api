import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";

import { User } from "../users/entities/user.entity";
import { LocalStrategy } from "./local.strategy";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./roles.guard";
import { AuthGuard } from "./auth.guard";


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.AUTH_SECRET,
        signOptions: {
          expiresIn: '60m'
        }
      })
    })
  ],
  providers: [LocalStrategy, JwtStrategy, AuthService,  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  controllers: [AuthController]
})
export class AuthModule { }
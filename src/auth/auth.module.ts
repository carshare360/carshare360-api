import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";

import { User } from "../users/entities/user.entity";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
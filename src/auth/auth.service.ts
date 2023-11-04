import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/entities/user.entity";


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      username: user.email,
      sub: user.id
    });
  }
}
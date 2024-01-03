import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/entities/user.entity";
import * as bcrypt from "bcrypt";
import { Role } from "./role.enum";
import { generate } from "rxjs";


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  public getTokenForUser(user: User): string {
    return this.jwtService.sign({
      email: user.email,
      sub: user.id,
      roles: user.roles.includes(Role.Admin) ? Role.Admin : Role.User,
      blackListed: user.blacklisted
    });
  }

  public async sendPasswordResetEmail(email: string): Promise<void> {
    // write send to the email reset link
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async comparePasswords(newPassword: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(newPassword, passwordHash);
  }
}
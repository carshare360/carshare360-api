import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, Length } from "class-validator";

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'itu@itu.edu.tr',
    description: 'The email of the User',
  })
  email: string;

  @Length(8, 20)
  @ApiProperty({
    example: '12345678',
    description: 'The password of the User',
  })
  password: string;
}
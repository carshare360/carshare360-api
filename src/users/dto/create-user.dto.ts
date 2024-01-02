import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'itu@itu.edu.tr',
  })
  email: string;
  
  @MinLength(8)
  @ApiProperty({
    description: 'The password of the user',
    example: '12345678',
  })
  password: string;

  @MinLength(8)
  @ApiProperty({
    description: 'The password of the user',
    example: '12345678',
  })
  retypedPassword: string;

  @MinLength(2)
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName: string;
  
  @MinLength(2)
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+905078671022',
  })
  phoneNumber: string;

  @MinLength(10)
  @MaxLength(300)
  @IsOptional()
  @ApiProperty({
    description: 'The about of the user',
    example: 'I am a student at ITU',
  })
  about: string;

}
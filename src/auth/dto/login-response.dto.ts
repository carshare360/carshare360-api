import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class LoginResponseDTo extends OmitType(User, ['password'] as const) {
    token: string;
}

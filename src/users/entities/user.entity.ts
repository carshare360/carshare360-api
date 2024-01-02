import { Role } from "src/auth/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;
    @Column()
    password: string;
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable: true})
    phoneNumber: string;

    @Column({nullable: true})
    about: string;

    @Column({type: 'enum', enum: Role, default: Role.User})
    roles: Role[];
}

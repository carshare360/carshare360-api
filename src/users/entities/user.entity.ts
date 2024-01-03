import { Role } from "src/auth/role.enum";
import { Alert } from "src/alerts/entities/alert.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    @Exclude()
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

    @Column({nullable: true, default: false})
    blacklisted: boolean;

    @OneToMany(() => Alert, alert => alert.user)
    alerts: Alert[];
}

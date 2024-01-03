import { User } from 'src/users/entities/user.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Status } from '../dto/status.enum';


@Entity()
export class Rentalrequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle;

  @Column({ type: 'enum', enum: [Status.Approved, Status.Pending, Status.Rejected, Status.Canceled], default: Status.Pending })
  status: Status;

  startDate: Date;

  endDate: Date;

  description: string;

}

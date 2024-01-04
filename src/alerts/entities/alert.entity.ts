import { Status } from 'src/rentalrequest/dto/status.enum';
import { Rentalrequest } from 'src/rentalrequest/entities/rentalrequest.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'alerts' })
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({type: 'enum', enum: Status, default: Status.Pending})
  status: Status;

  @ManyToOne(() => User, (user) => user.alerts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Rentalrequest)
  @JoinColumn({ name: 'rentalrequest_id' })
  rentalrequest: Rentalrequest;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

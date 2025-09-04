import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { CheckIns } from './checkin.entity';

@Entity()
@Unique(['name', 'user'])
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.habits, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => CheckIns, (checkIn) => checkIn.habit)
  checkIns: CheckIns[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

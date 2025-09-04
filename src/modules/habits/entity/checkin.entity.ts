import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Habit } from './habit.entity';

@Entity()
export class CheckIns {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  checkIn: Date;

  @ManyToOne(() => Habit, (habit) => habit.checkIns, { onDelete: 'CASCADE' })
  habit: Habit;
}

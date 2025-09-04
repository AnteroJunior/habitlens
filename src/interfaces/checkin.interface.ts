import { IHabit } from './habits.interface';

export interface ICheckIn {
  id: string;
  checkIn: Date;
  habit: IHabit;
}

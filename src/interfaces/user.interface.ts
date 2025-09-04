import { IHabit } from './habits.interface';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  habits: IHabit[];
  createdAt: Date;
  updatedAt: Date;
}

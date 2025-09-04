import { ICheckIn } from './checkin.interface';
import { IUser } from './user.interface';

export interface IHabit {
  id: string;
  name: string;
  user: IUser;
  checkIns: ICheckIn[];
  createdAt: Date;
  updatedAt: Date;
}

import { User } from '../modules/auth/entity/user.entity';
import { CheckIns } from '../modules/habits/entity/checkin.entity';
import { Habit } from '../modules/habits/entity/habit.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'mysql_db',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'habitlens',
  logging: false,
  entities: [User, Habit, CheckIns],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});

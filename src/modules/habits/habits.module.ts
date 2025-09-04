import { Module } from '@nestjs/common';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entity/habit.entity';
import { CheckIns } from './entity/checkin.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Habit, CheckIns])],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}

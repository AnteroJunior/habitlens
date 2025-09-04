import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { IHabit } from 'src/interfaces/habits.interface';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { MetricsController } from '../metrics/metrics.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './entity/habit.entity';
import { CheckIns } from './entity/checkin.entity';
import { User } from '../auth/entity/user.entity';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Habit) private habitRepository: Repository<Habit>,
    @InjectRepository(CheckIns) private checkInRepository: Repository<CheckIns>,
  ) {}

  async getHabits(userId: string) {
    const habits = await this.habitRepository.find({
      where: { user: { id: userId } },
      relations: ['checkIns'],
    });

    return habits;
  }

  async createHabit(userId: string, habit: CreateHabitDto) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const newHabit = Object.assign(new Habit(), habit);
    newHabit.user = user;

    // Incrementar métrica de hábitos criados
    MetricsController.incrementHabitsCreated();

    return await this.habitRepository.save(newHabit);
  }

  async changeHabitName(userId: string, informations: UpdateHabitDto) {
    const habit = await this.habitRepository.findOne({
      where: {
        id: informations.id,
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (!habit) {
      throw new NotFoundException('Hábito não encontrado para o usuário');
    }

    habit.name = informations.name;
    await this.habitRepository.save(habit);

    return { message: 'Hábito alterado com sucesso', habit };
  }

  async checkIn(userId: string, habitId: string) {
    const habit = await this.habitRepository.findOne({
      where: {
        id: habitId,
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (!habit) {
      throw new Error('Hábito não encontrado para o usuário');
    }

    MetricsController.incrementCheckins();

    const checkIn = Object.assign(new CheckIns(), {
      checkIn: new Date(),
      habit: habit,
    });

    await this.checkInRepository.save(checkIn);
    return { message: 'Check-in realizado com sucesso' };
  }

  async deleteHabit(userId: string, habitId: string) {
    const habit = await this.habitRepository.findOne({
      where: {
        id: habitId,
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (!habit) {
      throw new Error('Hábito não encontrado para o usuário');
    }

    return await this.habitRepository.remove(habit);
  }

  findUserHabitById(userHabits: IHabit[], habitId: string): IHabit | undefined {
    const habit = userHabits.find((habit) => habit.id === habitId);
    return habit;
  }
}

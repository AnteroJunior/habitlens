import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/database/schemas/user.schema';
import { CreateHabitDto } from './dto/create-habit.dto';
import { IHabit } from 'src/interfaces/habits.interface';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { MetricsController } from '../metrics/metrics.controller';

@Injectable()
export class HabitsService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  readonly defaultHabit: Partial<IHabit> = {
    createdAt: new Date(),
    updatedAt: new Date(),
    checkIns: [new Date()],
  };

  async getHabits(userId: string) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user.habits;
  }

  async createHabit(userId: string, habit: CreateHabitDto): Promise<IHabit> {
    const user = await this.userModel.findOne({ _id: userId }).exec();

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    user.habits = user.habits || [];

    const exists = user.habits.find((h) => h.name === habit.name);
    if (exists) {
      throw new ConflictException('Hábito já cadastrado');
    }

    const newHabit: IHabit = {
      ...habit,
      ...this.defaultHabit,
    } as IHabit;

    await this.userModel.updateOne(
      { _id: userId },
      { $push: { habits: newHabit } },
    );

    // Incrementar métrica de hábitos criados
    MetricsController.incrementHabitsCreated();

    return newHabit;
  }

  async changeHabit(userId: string, informations: UpdateHabitDto) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const habit = user.habits.find((h) => h.name === informations.currentName);
    if (!habit) {
      throw new NotFoundException('Hábito não cadastrado');
    }

    habit.name = informations.newName;
    habit.updatedAt = new Date();

    user.markModified('habits');
    await user.save();

    return habit;
  }

  async checkIn(userId: string, name: string) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const habit = user.habits.find((h) => h.name === name);
    if (!habit) {
      throw new NotFoundException('Hábito não cadastrado');
    }

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const existingCheckIn = habit.checkIns.find(
      (ci: Date) => ci.toISOString().split('T')[0] === todayStr,
    );

    if (existingCheckIn) {
      throw new ConflictException('Hábito ja registrado hoje');
    } else {
      habit.checkIns.push(today);
      
      // Incrementar métrica de check-ins
      MetricsController.incrementCheckins();
    }

    habit.updatedAt = new Date();
    await user.save();

    return habit;
  }

  async deleteHabit(userId: string, name: string) {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const habit = user.habits.find((h) => h.name === name);
    if (!habit) {
      throw new NotFoundException('Hábito não cadastrado');
    }

    user.habits = user.habits.filter((h) => h.name !== name);
    user.markModified('habits');
    await user.save();

    return { message: 'Hábito deletado com sucesso' };
  }
}

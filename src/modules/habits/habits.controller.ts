/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Hábitos')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os hábitos do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Lista de hábitos retornada com sucesso',
    schema: {
      example: [
        {
          name: 'Exercitar-se',
          checkins: [],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z'
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async getHabits(@Request() req: { user: { id: string } }) {
    return await this.habitsService.getHabits(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo hábito' })
  @ApiBody({ type: CreateHabitDto })
  @ApiResponse({
    status: 201,
    description: 'Hábito criado com sucesso',
    schema: {
      example: {
        message: 'Hábito criado com sucesso',
        habit: {
          name: 'Exercitar-se',
          checkins: [],
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async createHabit(
    @Request() req: { user: { id: string } },
    @Body() habit: CreateHabitDto,
  ) {
    try {
      return await this.habitsService.createHabit(req.user.id, habit);
    } catch (error: any) {
      return { message: error.message };
    }
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar nome do hábito' })
  @ApiBody({ type: UpdateHabitDto })
  @ApiResponse({
    status: 200,
    description: 'Hábito atualizado com sucesso',
    schema: {
      example: {
        message: 'Hábito atualizado com sucesso',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Hábito não encontrado' })
  async updateHabits(
    @Request() req: { user: { id: string } },
    @Body() informations: UpdateHabitDto,
  ) {
    try {
      return await this.habitsService.changeHabit(req.user.id, informations);
    } catch (error: any) {
      return { message: error.message };
    }
  }

  @Post('checkin')
  @ApiOperation({ summary: 'Fazer check-in em um hábito' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Exercitar-se',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Check-in realizado com sucesso',
    schema: {
      example: {
        message: 'Check-in realizado com sucesso',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Hábito não encontrado' })
  async checkIn(
    @Request() req: { user: { id: string } },
    @Body() habit: { name: string },
  ) {
    try {
      return await this.habitsService.checkIn(req.user.id, habit.name);
    } catch (error: any) {
      return { message: error.message };
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Deletar um hábito' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Exercitar-se',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Hábito deletado com sucesso',
    schema: {
      example: {
        message: 'Hábito deletado com sucesso',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Hábito não encontrado' })
  async deleteHabit(
    @Request() req: { user: { id: string } },
    @Body() habit: { name: string },
  ) {
    try {
      return await this.habitsService.deleteHabit(req.user.id, habit.name);
    } catch (error: any) {
      return { message: error.message };
    }
  }
}

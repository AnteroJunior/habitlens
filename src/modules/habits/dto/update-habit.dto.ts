import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHabitDto {
  @ApiProperty({
    description: 'Nome atual do hábito',
    example: 'Exercitar-se',
  })
  @IsString()
  @IsNotEmpty()
  currentName: string;

  @ApiProperty({
    description: 'Novo nome do hábito',
    example: 'Fazer exercícios',
  })
  @IsString()
  @IsNotEmpty()
  newName: string;
}

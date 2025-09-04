import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHabitDto {
  @ApiProperty({
    description: 'Id do hábito',
    example: '123a-456b-789c',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Novo nome do hábito',
    example: 'Fazer exercícios',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

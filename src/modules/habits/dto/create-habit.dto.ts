import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHabitDto {
  @ApiProperty({
    description: 'Nome do hábito',
    example: 'Exercitar-se',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHabitDto {
  @ApiProperty({
    name: 'name',
    example: 'Fazer exercícios',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

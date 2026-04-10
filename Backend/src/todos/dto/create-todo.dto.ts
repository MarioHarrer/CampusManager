import { IsString, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  name: string;
  description: string;
  date: Date;
  startTime: Date;
  endTime: Date;
}
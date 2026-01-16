import { IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(3)
  name: string;
}

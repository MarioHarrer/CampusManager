import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;
  email: string;
  favTeam: string;
  ort: string;
}

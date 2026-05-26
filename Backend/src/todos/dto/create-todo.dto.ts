import { IsString, MinLength, IsOptional, IsDateString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(3)
  name: string;

  // Erlaubt das Feld als String. Da es auch leer sein darf,
  // ist IsOptional hier ebenfalls sinnvoll, auch wenn dein Frontend
  // ohnehin immer den Meta-Tag mitschickt.
  @IsString()
  @IsOptional()
  description?: string;

  // IsDateString validiert, ob der ISO-String des Frontends korrekt ist
  @IsDateString()
  date: Date;

  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @IsDateString()
  @IsOptional()
  endTime?: Date;
}
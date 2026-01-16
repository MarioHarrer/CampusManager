import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CalendarModule } from './calendar/calendar.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './auth/entities/auth.entity';
import { User } from './users/entities/user.entity';
import { Calendar } from './calendar/entities/calendar.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'supersecret',
    database: 'todo_app',
    entities: [Auth, User, Calendar],
    synchronize: true,
  }),
    TypeOrmModule.forFeature([Calendar]),
    AuthModule,
    UsersModule,
    CalendarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

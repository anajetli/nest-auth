import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_Attendee } from './attendee.entity';
import { DB_Event } from './event.entity';
import { EventsController } from './events.controller';
import { DB_User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'esco',
      entities: [DB_Event, DB_Attendee, DB_User],
    }),
    TypeOrmModule.forFeature([DB_Event]),
    UsersModule
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}

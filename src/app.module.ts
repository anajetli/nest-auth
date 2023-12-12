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
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [DB_Event, DB_Attendee, DB_User],
    }),
    TypeOrmModule.forFeature([DB_Event]),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}

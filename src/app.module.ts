import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_Event } from './event.entity';
import { EventsController } from './events.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '',
      database: 'esco',
      entities: [DB_Event]
    }),
    TypeOrmModule.forFeature([DB_Event])
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}

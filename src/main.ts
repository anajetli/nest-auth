import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from "express-session";
import * as MySQLStoreCreator from "express-mysql-session";
import * as mysql2 from "mysql2/promise";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //session store
  const options = {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    //checkExpirationInterval: 1000 * 60 * 60 * 2,
    //expiration: 1000 * 60 * 60 * 24,
  };

  const connection = mysql2.createPool(options);
  const sessionStore = new (MySQLStoreCreator(session));

  /*
  const connection = mysql2.createPool(options);
  const sessionStore = new (MySQLStoreCreator(session))({}, connection);
  /*
  const store = MySQLStore(session);
  const sessionStore = new store(options);
  */

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
}
bootstrap();

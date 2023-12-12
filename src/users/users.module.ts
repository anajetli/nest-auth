import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { LocalStrategy } from 'src/auth/local.strategy';
import { DB_User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DB_User]),
    JwtModule.registerAsync({
        useFactory: () => ({
            secret: process.env.AUTH_SECRET,
            signOptions: {
                expiresIn: '60m'
            }
        })
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtService, LocalStrategy, JwtStrategy,]
})
export class UsersModule {}

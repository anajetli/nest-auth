import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_User } from 'src/users/user.entity';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([DB_User])],
    providers: [LocalStrategy]
})
export class AuthModule {}

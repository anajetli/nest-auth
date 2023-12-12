import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DB_User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@CurrentUser() user: DB_User){
        return {
            email: user.email,
            token: this.authService.getTokenForUser(user)
        }
    }


    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@CurrentUser() user: DB_User){
        return user;
    }
}
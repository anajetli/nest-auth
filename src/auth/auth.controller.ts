import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request){
        return {
            email: request.user.email,
            token: this.authService.getTokenForUser(request.user)
        }
    }


    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@Request() request){
        return request.user;
    }
}
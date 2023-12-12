import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request){
        return {
            email: request.user.email,
            token: 'the token'
        }
    }
}
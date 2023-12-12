import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DB_User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ){}

    public getTokenForUser(user: DB_User): string {
        return this.jwtService.sign({
            username: user.email,
            sub: user.id
        })
    }
}
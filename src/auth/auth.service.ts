import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DB_User } from 'src/users/user.entity';
import * as bcrypt from "bcrypt";
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


    public async hashPassword(password: string): Promise<string>{
        return await bcrypt.hash(password, 10);
    }
}
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { DB_User } from "src/users/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    private readonly logger = new Logger(LocalStrategy.name);

    constructor(
        @InjectRepository(DB_User)
        private readonly  userRepository: Repository<DB_User>
    ){
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    public async validate(username:string, password: string) : Promise<any>{
        const user = this.userRepository.findOne({ where: {email: username}});

        if(!user){
            this.logger.debug(`User ${username} not found!`);
            throw new UnauthorizedException();
        }

        return user;
    }
}
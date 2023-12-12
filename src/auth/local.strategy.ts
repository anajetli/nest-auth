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
        super();
    }

    public async validate(email: string) : Promise<any>{
        const user = await this.userRepository.findOne({
            where: { email }
        });

        if(!user){
            this.logger.debug(`User ${email} not found!`);
            throw new UnauthorizedException();
        }

        return user;
    }
}
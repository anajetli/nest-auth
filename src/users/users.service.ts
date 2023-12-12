import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DB_User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(DB_User)
        private usersRepository: Repository<DB_User>
    ){}

    async getUsers(): Promise<DB_User[]>{
        return await this.usersRepository.find();
    }

    async getUser(_id: number): Promise<DB_User[]>{
        return await this.usersRepository.find({
            select: ['first_name', 'last_name', 'access_token', 'refresh_token', 'email'],
            where: [{ "id": _id}]
        });
    }

    async updateUser(user: DB_User){
        await this.usersRepository.save(user);
    }

    async createUser(user: DB_User){
        await this.usersRepository.save(user);
    }
}

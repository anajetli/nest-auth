import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DB_User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @Get()
    async findAll() {
        return await this.service.getUsers();
    }

    @Get(':id')
    async get(@Param() params) {
        return await this.service.getUser(params.id);
    }

    @Post()
    async create(@Body() user: DB_User) {
        return await this.service.createUser(user);
    }

    @Patch()
    async update(@Body() user: DB_User) {
        return await this.service.updateUser(user);
    }
}

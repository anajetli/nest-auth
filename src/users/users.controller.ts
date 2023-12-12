import { BadRequestException, Body, Controller, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { DB_User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private service: UsersService,
        private authService: AuthService,
        @InjectRepository(DB_User)
        private readonly userRepository: Repository<DB_User>
    ) {}

    @Get()
    async findAll() {
        return await this.service.getUsers();
    }

    @Get(':id')
    async get(@Param() params) {
        return await this.service.getUser(params.id);
    }

    @Post()
    async create(@Body(new ValidationPipe({transform: true})) createUserDto: CreateUserDto) {
        const user = new DB_User();
        if(createUserDto.password !== createUserDto.retypedPassword){
            throw new BadRequestException(['Passwords are not identical']);
        }

        const existingUser = await this.userRepository.findOne({ where: {email: createUserDto.email}});
        if(existingUser){
            throw new BadRequestException(['email is already taken']);
        }

        user.first_name = createUserDto.first_name;
        user.last_name = createUserDto.last_name;
        user.email = createUserDto.email;
        user.access_token = createUserDto.access_token;
        user.refresh_token = createUserDto.refresh_token;
        user.id_token = createUserDto.id_token;
        user.expires_in = createUserDto.expires_in;
        user.me = createUserDto.me;
        user.password = await this.authService.hashPassword(createUserDto.password);

        return {
            ...(await this.userRepository.save(user)),
            token: this.authService.getTokenForUser(user)
        }
    }

    @Patch()
    async update(@Body() user: DB_User) {
        return await this.service.updateUser(user);
    }
}

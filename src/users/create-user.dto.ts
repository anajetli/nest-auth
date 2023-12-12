import { IsEmail } from "class-validator";

export class CreateUserDto {
    first_name: string;
    last_name: string;

    @IsEmail()
    email: string;
    
    access_token: string;
    refresh_token: string;
    id_token: string;
    expires_in: number;
    me: string;
    password: string;
    retypedPassword: string;
}
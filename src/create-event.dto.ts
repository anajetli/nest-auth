import { IsDateString, IsString, Length } from "class-validator";

export class CreateEventDto {
    @IsString()
    @Length(3, 99)
    name: string;

    @Length(3, 99)
    description: string;

    @IsDateString()
    date: string;

    @Length(3, 99)
    address: string;
}
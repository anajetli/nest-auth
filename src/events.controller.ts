import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateEventDto } from "./create-event.dto";
import { DB_Event } from "./event.entity";
import { UpdateEventDto } from "./update-event.dto";

@Controller('/events')
export class EventsController {

    constructor(
        @InjectRepository(DB_Event)
        private readonly repository: Repository<DB_Event>
    ){}

    @Get()
    async findAll() {
        return await this.repository.find();
    }

    @Get(':id')
    async fineOne(@Param('id', new ParseIntPipe) id) {
        return await this.repository.findOne({ where: {id: id}});
    }

    @Post()
    async create(@Body() input: CreateEventDto) {
        return await this.repository.save({
            ...input,
            date: new Date(input.date),            
        });
    }

    @Patch(':id')
    async update(@Param('id', new ParseIntPipe) id, @Body(ValidationPipe) input: UpdateEventDto) {
        const event = await this.repository.findOne({ where: {id: id}});
        return await this.repository.save({
            ...event,
            ...input,
            date: input.date ? new Date(input.date) : (await event).date
        });
    }

    @Delete(':id')
    async remove(@Param('id', new ParseIntPipe) id) {
        const event = await this.repository.findOne({ where: {id: id}});
        await this.repository.remove(event);
    }
}
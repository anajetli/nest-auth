import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateEventDto } from "./create-event.dto";
import { UpdateEventDto } from "./update-event.dto";

@Controller('/events')
export class EventsController {
    @Get()
    findAll() {}

    @Get(':id')
    fineOne(@Param('id') id) {
        return id;
    }

    @Post()
    create(@Body() input: CreateEventDto) {
        return input;
    }

    @Patch(':id')
    update(@Param('id') id, @Body() input: UpdateEventDto) {}

    @Delete(':id')
    remove(@Param('id') id) {}
}
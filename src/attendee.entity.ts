import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DB_Event } from "./event.entity";

@Entity('attendee')
export class DB_Attendee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => DB_Event, (event) => event.attendees)
    @JoinColumn({
        name: 'eventId'
    })
    events: DB_Event;
}
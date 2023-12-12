import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DB_Attendee } from "./attendee.entity";
@Entity('events')
export class DB_Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    address: string;

    @OneToMany(() => DB_Attendee, (attendee) => attendee.events, {
        eager: true
    })
    attendees: DB_Attendee[];
}
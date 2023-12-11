import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}
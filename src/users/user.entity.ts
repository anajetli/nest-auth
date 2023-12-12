import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class DB_User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    access_token: string;

    @Column()
    refresh_token: string;

    @Column()
    id_token: string;

    @Column()
    expires_in: number;

    @Column()
    me: string;

    @Column()
    password: string;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;
}
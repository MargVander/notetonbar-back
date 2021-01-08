import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    idUsers: number;

    @Column()
    pseudo: string

    @Column()
    mail: string

    @Column({ default: null })
    profile_picture: string

    @Column()
    password: string

    @Column({ default: true })
    active: boolean
}
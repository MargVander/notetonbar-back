import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import {Bar} from "../../bars/models/bars.entity";
import {User} from "../../user/entities/user.entity"

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    rating: number;

    @Column({ default: true })
    isactive: number;

    @ManyToOne(() => Bar, bar => bar.reviews, { nullable: false })
    @JoinColumn({name: 'barId'})
    bar: Bar;

    @Column({  type: "int", nullable: false })
     barId: number;

    @ManyToOne(() => User, user => user.reviews, { nullable: false })
    @JoinColumn({name: 'userId'})
    user: User;

    @Column({  type: "int", nullable: false })
     userId: number;
}
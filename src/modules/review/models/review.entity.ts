import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {Bar} from "../../bars/models/bars.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    rating: number;

    @Column()
    isactive: number;

    @ManyToOne(() => Bar, bar => bar.reviews)
    bar: Bar;
}
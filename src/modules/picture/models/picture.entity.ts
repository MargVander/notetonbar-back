import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import {Bar} from "../../bars/models/bars.entity";

@Entity()
export class Picture {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string

    @ManyToOne(() => Bar, bar => bar.pictures)
    bar: Bar;

    @Column({ type: "int", nullable: false })
    barId: number;
}
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {Picture} from "../../picture/models/picture.entity";
import {Review} from "../../review/models/review.entity";

@Entity()
export class Bar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: null })
    description: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    zip_code: number;

    @Column()
    hours: string;

    @Column()
    happy_hour: string;

    @Column()
    coords: string;

    @Column()
    website_link: string

    @Column()
    qrcode_menu: string

    @Column({ default: true })
    isactive: boolean

    @OneToMany(() => Picture, picture => picture.bar)
    pictures: Picture[];

    @OneToMany(() => Review, review => review.bar)
    reviews: Picture[];
}
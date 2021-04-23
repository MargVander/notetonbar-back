import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import {Picture} from "../../picture/models/picture.entity";
import {Review} from "../../review/models/review.entity";
import {BarReviews} from "./barReviews.entity"

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

    @Column({ type: 'json', nullable: true })
    hours: string;

    @Column()
    happy_hour: string;

    @Column({ default: false })
    terrace: boolean

    @Column({ type: 'json', nullable: true })
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

    @OneToOne(() => BarReviews, bar_reviews => bar_reviews.bar)
    rating: BarReviews;
}
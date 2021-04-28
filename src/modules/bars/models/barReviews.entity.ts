import { ViewEntity, ViewColumn, Connection, OneToOne, JoinColumn } from "typeorm";
import { Review } from '../../review/models/review.entity'
import { Bar } from "./bars.entity";

@ViewEntity({ 
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("review.barId", "barId")
        .addSelect("round(AVG(review.rating), 1)", "avg_rating")
        .from(Review, "review")
        .where("review.isactive = 1")
        .groupBy("review.barId")
})


export class BarReviews {
    @ViewColumn()
    barId: number;

    @ViewColumn()
    avg_rating: number;

    @OneToOne(() => Bar, bar => bar.rating)
    @JoinColumn()
    bar: Bar;
}

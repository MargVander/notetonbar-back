import { Review } from '../../review/models/review.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Question {
  Q1 = "En cas de forte chaleur, vers quelle bière te tourne tu ?",
  Q2 = "Le premier bar ou tu as eu ta soirée la plus mémorable ?",
  Q3 = "Quelle est la boisson préférée de tes grands parents ?"
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  pseudo: string;

  @Column()
  password: string;

  @Column({ unique: true })
  mail: string;

  @Column({ default: null })
  profile_picture: string;

  @Column({
    type: "enum",
    enum: Question,
    default: Question.Q1
  })
  question: Question

  @Column()
  response: String

  @Column({ default: true })
  isactive: boolean;

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: 'follow',
    joinColumn: { name: 'followers' },
    inverseJoinColumn: { name: 'following' },
  })
  followers: User[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];


  @ManyToMany(() => User, (user) => user.followers)
  following: User[];
}

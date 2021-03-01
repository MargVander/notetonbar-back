import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Follow } from './follow.entity';
import { Review } from '../../review/models/review.entity'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pseudo: string;

  @Column()
  password: string;

  @Column()
  mail: string;

  @Column({ default: null })
  profile_picture: string;

  @Column({ default: true })
  isactive: boolean;

  @OneToMany(() => Follow, (follow) => follow.followers)
  followers: User[];

  @OneToMany(() => Follow, (follow) => follow.followed)
  followed: User[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}

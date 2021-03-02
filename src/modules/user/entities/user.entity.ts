import { Review } from '../../review/models/review.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

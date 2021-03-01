import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('follow')
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isblocked: boolean;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn()
  followers: User[];

  @ManyToOne(() => User, (user) => user.followed)
  followed: User[];
}

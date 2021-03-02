import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('follow')
export class Follow {
  @Column()
  @PrimaryColumn()
  followers: number;

  @Column()
  @PrimaryColumn()
  following: number;

  @Column({ default: false })
  isblocked: boolean;
}

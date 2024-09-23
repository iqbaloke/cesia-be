import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category_entity';

@Entity({ name: 'sub_categories' })
export class SubCategory {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  category_id?: number;
  @ManyToOne(() => Category, (category) => category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;
}

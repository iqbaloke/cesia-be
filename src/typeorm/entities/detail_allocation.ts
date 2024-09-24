import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category_entity';
import { District } from './district_entity';
import { User } from './user_entity';
import { Allocation } from './allocation';

@Entity({ name: 'detail_allocations' })
export class DetailAllocation {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: true })
  nilai: number;

  @Column({ nullable: true })
  date?: Date;

  @Column({ type: 'decimal', nullable: true })
  kota?: number;

  @Column({ type: 'decimal', nullable: true })
  provinsi?: number;

  @Column({ type: 'decimal', nullable: true })
  pusat?: number;

  @Column({ type: 'decimal', nullable: true })
  potongan_kota?: number;

  @Column({ type: 'decimal', nullable: true })
  potongan_provinsi?: number;

  @Column({ type: 'decimal', nullable: true })
  potongan_pusat?: number;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column()
  category_id?: number;
  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column()
  allocation_id?: number;
  @OneToOne(() => Allocation, { nullable: true })
  @JoinColumn({ name: 'allocation_id' })
  allocation?: Allocation;

  @Column()
  district_id?: number;
  @ManyToOne(() => District, { nullable: true })
  @JoinColumn({ name: 'district_id' })
  district?: Category;

  @Column()
  user_id?: number;
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}

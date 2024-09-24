import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Allocation } from './allocation';
import { DetailAllocation } from './detail_allocation';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column()
  user_role: string;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Allocation, (allocation) => allocation.user)
  allocation: Allocation;

  @OneToMany(() => DetailAllocation, (allocationdetail) => allocationdetail.category)
  allocationdetail: DetailAllocation;
  
}

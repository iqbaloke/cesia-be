import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './subcategory_entity';
import { Allocation } from './allocation';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  jenis: string;

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @OneToMany(() => SubCategory, (subcategory) => subcategory.category)
  subcategory: SubCategory;

  @OneToMany(() => Allocation, (allocation) => allocation.category)
  allocation: Allocation;

}

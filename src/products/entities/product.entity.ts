//import { Review } from 'src/review/models/review.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductStatus } from '../product.enum';
// import { User } from './user.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar', { name: 'product_title' })
  product_title: string;

  @Column('int', { name: 'product_price' })
  product_price: number;

  @Column('int', { name: 'product_discount_price' })
  product_discount_price: number;

  @Column('varchar', { name: 'product_account' })
  product_account: string;

  @Column('varchar', { name: 'product_main_image' })
  product_main_image: string;

  @Column('varchar', { name: 'product_first_image' })
  product_first_image: string;

  @Column('varchar', { name: 'product_second_image' })
  product_second_image: string;

  // @Column('date', { name: 'product_start_at' })
  // product_start_at: Date;

  // @Column('date', { name: 'product_end_at' })
  // product_end_at: Date;

  // @Column('int', { name: 'product_stock' })
  // product_stock: number;

  // @Column('int', { name: 'product_extra_price' })
  // product_extra_price: number;

  @Column('varchar', { name: 'product_category' })
  product_category: string;

  @Column('char', { name: 'product_use_yn' })
  product_use_yn: ProductStatus;

  @Column('varchar', { name: 'product_keyword' })
  product_keyword: string;

  @Column('varchar', { name: 'product_method' })
  product_method: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @CreateDateColumn({
    name: 'modified_at',
  })
  modified_at: Date;

  //   @ManyToOne((type) => User, (user) => user.products, { eager: false })
  //   user: User;
}

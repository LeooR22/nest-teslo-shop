import { Product } from '../../products/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({
    example: '2103bd66-2f2e-411a-a3b8-3bc8a7fb1cbd',
    description: 'The unique id of the user',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'User email',
    example: 'jhon_doe@gmail.com',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Abc123',
    minLength: 6,
  })
  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    description: 'User name',
    example: 'Jhone doe',
  })
  @Column('text', {})
  fullName: string;

  @ApiProperty({
    description: 'Is active user ?',
    example: true,
  })
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'User role',
    example: ['user', 'admin'],
  })
  @Column({
    type: 'text',
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldBeforeUpdate() {
    this.checkFieldBeforeInsert();
  }
}

import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType() // GraphQL
@Entity()     // TypeORM
export class Profile {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp', nullable: true })
  birthDate?: Date;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  age?: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'float', nullable: true })
  salary?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  jobTitle?: string;

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  skills?: string[];

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  isVerified: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn()
  updatedAt?: Date;
}

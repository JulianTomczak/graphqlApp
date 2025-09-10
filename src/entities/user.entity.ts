import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from '../entities/profile.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  // Nota: si no quieres exponer el password en GraphQL, NO pongas @Field aquí
  @Column()
  password: string;

  @Field(() => Profile)
  @OneToOne(() => Profile, { cascade: true, eager: true })
  @JoinColumn()
  profile: Profile;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  isActive: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  registeredAt: Date;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn()
  lastLogin?: Date;
}

import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => Date, { nullable: true })
  birthDate?: Date;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => Float, { nullable: true })
  salary?: number;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  jobTitle?: string;

  @Field(() => [String], { nullable: true })
  skills?: string[];
}

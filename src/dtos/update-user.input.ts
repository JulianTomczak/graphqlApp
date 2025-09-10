import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) { //hace que todos los campos de creación sean opcionales
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => Date, { nullable: true })
  lastLogin?: Date;
}

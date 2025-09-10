import { InputType, Field } from '@nestjs/graphql';
import { CreateProfileInput } from './create-profile.input';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => CreateProfileInput)
  profile: CreateProfileInput;
}

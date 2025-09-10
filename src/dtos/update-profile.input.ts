import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateProfileInput } from './create-profile.input';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) { //hace que todos los campos de CreateProfileInput sean opcionales.
}

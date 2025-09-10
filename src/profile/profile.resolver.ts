import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProfilesService } from './profile.service';
import { Profile } from '../entities/profile.entity';
import { CreateProfileInput } from '../dtos/create-profile.input';
import { UpdateProfileInput } from '../dtos/update-profile.input';
import { UserInputError } from 'apollo-server-express';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Query(() => [Profile], { name: 'profiles' })
  findAll() {
    return this.profilesService.findAll();
  }

  @Query(() => Profile, { name: 'profile' })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    return this.profilesService.findOne(id); // lanza NotFoundException si no existe
  }

  @Mutation(() => Profile)
  async createProfile(@Args('createProfileInput') createProfileInput: CreateProfileInput) {
    return this.profilesService.create(createProfileInput);
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    try {
      return await this.profilesService.update(id, updateProfileInput);
    } catch (error) {
      if (error.message.includes('llave duplicada')) {
        throw new UserInputError('El correo electrónico ya está en uso por otro perfil');
      }
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async removeProfile(@Args('id', { type: () => ID }) id: number) {
    return this.profilesService.remove(id);
  }
}

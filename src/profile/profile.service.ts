import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { CreateProfileInput } from '../dtos/create-profile.input';
import { UpdateProfileInput } from 'src/dtos/update-profile.input';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepo: Repository<Profile>,
  ) {}

  findAll(): Promise<Profile[]> {
    return this.profilesRepo.find();
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.profilesRepo.findOne({ where: { id } });
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  create(data: CreateProfileInput): Promise<Profile> {
    const newProfile = this.profilesRepo.create({
      ...data,
      isVerified: false,
      createdAt: new Date(),
    });
    return this.profilesRepo.save(newProfile);
  }

  async update(id: number, data: UpdateProfileInput): Promise<Profile> {
  const profile = await this.findOne(id);

  const updatedProfile = {
    ...profile,
    ...data,       
    updatedAt: new Date(),
  };

  await this.profilesRepo.save(updatedProfile);
  return this.findOne(id);
}

  async remove(id: number): Promise<boolean> {
    const result = await this.profilesRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dtos/create-user.input';
import { UpdateUserInput } from '../dtos/update-user.input';
import { ProfilesService } from '../profile/profile.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private profilesService: ProfilesService, // inyectamos service de Profile
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async create(data: CreateUserInput): Promise<User> {
    // opcional: crear profile desde ProfilesService
    const profile = await this.profilesService.create(data.profile);

    const newUser = this.usersRepo.create({
      username: data.username,
      password: data.password,
      profile, // relación 1:1
    });

    return this.usersRepo.save(newUser);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

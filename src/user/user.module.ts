import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './user.resolver';
import { User } from '../entities/user.entity';
import { ProfilesModule } from '../profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProfilesModule],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}

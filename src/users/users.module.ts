import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // to indicate that this module will use the User entity
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

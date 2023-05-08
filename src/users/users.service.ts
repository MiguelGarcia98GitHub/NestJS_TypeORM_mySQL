import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}



  getUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  getUser(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id
      }
    })
  }

  createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser); // this line of code is async, return will just return a promise here
  }

  deleteUser(id: number) {
    return this.userRepository.delete({id});
  }

  updateUser(id: number, user: updateUserDto) {
    return this.userRepository.update({id}, user);
  }


}

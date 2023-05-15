import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import {HttpStatus} from '@nestjs/common'
import { CreateProfileDto } from './dto/createProfile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  async getUser(id: number): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      }
    })

    if(!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return userFound
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const userFound = await this.userRepository.findOne({
    where: {
      username: user.username
    }  
    })

    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser); // this line of code is async, return will just return a promise here
  }

  async deleteUser(id: number) {
    // Option 1:
    // const userFound = await this.userRepository.findOne({
    //   where: {
    //     id
    //   }
    // });

    // if (!userFound) {
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    // }

    // return this.userRepository.delete({id})


    // Option 2: (slightly shorter)
    const result = await this.userRepository.delete({
      id
    })

    if (result.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return result;
  }

  async updateUser(id: number, user: updateUserDto) {
   const userFound = await this.userRepository.findOne({
    where: {
      id
    }
   });

   if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
   }

   const updatedUser = Object.assign(userFound, user);
   return this.userRepository.save(updatedUser);
  }

  // this could be created in another service, but for simplicity, we'll just put it here
  async createProfile(id: number, profile: CreateProfileDto ) {
   const userFound = await this.userRepository.findOne({
      where: {
        id
      }
    })

    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const newProfile = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile)
    userFound.profile = savedProfile;

    return this.userRepository.save(userFound);
  }

 
}

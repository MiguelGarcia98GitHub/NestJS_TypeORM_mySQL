import { Controller, Post, Body, Get, Delete, Patch, Param, ParseIntPipe } from '@nestjs/common'; // body is the req.body that will come from a client request
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser); // this line of code is async, here it awaits the promise and returns the result
  }

  @Delete(":id")
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @Patch(":id")
  updateUser(@Param("id", ParseIntPipe) id: number, @Body() user: updateUserDto) {
    return this.usersService.updateUser(id, user);
  }

}

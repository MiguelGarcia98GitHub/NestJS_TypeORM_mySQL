import { Controller, Post, Body } from '@nestjs/common'; // body is the req.body that will come from a client request
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    createUser(@Body() newUser: CreateUserDto) {
        return this.usersService.createUser(newUser); // this line of code is async, here it awaits the promise and returns the result
    }
}

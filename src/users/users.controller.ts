import { Controller, Post, Body, Get } from '@nestjs/common';
import { createUserDto } from './dtos/create.user.dto';

@Controller('users')
export class UsersController {
    @Post()
    createUser(@Body() body: createUserDto) {
        return body;
    }
    @Get()
    getUsers() {
        return 'get all users';
    }
}

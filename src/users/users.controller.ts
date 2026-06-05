import { Controller, Post, Body, Get, Param, Delete, Patch, Query, UseGuards } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';


@Controller('users')
@Serialize(UserDto)

export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) { }
   
    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.findAll();
    }

    @Post()
    createUser(@Body() body: createUserDto) {
        return this.userService.create(body.name, body.email, body.password);
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: updateUserDto) {
        return this.userService.update(parseInt(id), body);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Get('/auth/current-user')
    @UseGuards(AuthGuard)
    currentUser(@CurrentUser() user: User) {
        return user;
    }
}

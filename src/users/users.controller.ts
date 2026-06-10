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
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  // GET /users
  @Get()
  findAllUsers() {
    return this.userService.findAll();
  }

  // ✅ REGISTER USER
  // POST /users
  @Post()
  createUser(@Body() body: createUserDto) {
    return this.userService.create(
      body.name,
      body.email,
      body.password,
    );
  }

  // GET /users/:id
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  // PATCH /users/:id
  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: updateUserDto,
  ) {
    return this.userService.update(parseInt(id), body);
  }

  // DELETE /users/:id
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  // GET /users/auth/current-user
  @Get('/auth/current-user')
  @UseGuards(AuthGuard)
  currentUser(@CurrentUser() user: User) {
    return user;
  }
}
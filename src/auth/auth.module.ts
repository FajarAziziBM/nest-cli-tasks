import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersService, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor,
  }],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }

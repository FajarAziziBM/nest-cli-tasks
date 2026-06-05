import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from './auth.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule, // <-- add this
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService],
  

})
export class UsersModule {}

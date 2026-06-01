import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [UsersModule, ItemsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
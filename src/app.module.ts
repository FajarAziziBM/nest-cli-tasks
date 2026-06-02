import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Item } from './items/item.entity';

@Module({
    imports: [
        UsersModule,
        ItemsModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'secondhandmarket',
            entities: [User, Item],
            synchronize: true,
        }), 
    ],
})
export class AppModule { }
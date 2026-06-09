//app.module.ts

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Item } from './items/item.entity';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import cookieSession from 'cookie-session';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
        UsersModule,
        ItemsModule,
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [User, Item],
                synchronize: true,
            }),
        }),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'APP_PIPE',
            useValue: new ValidationPipe({
                whitelist: true,
            }),
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                cookieSession({
                    keys: ['srekeragaytrw'],
                }),
            )
            .forRoutes('*');
    }
}
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async register(name: string, email: string, password: string) {
        // cek apa ada user dengan email yang sama
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('email in use');
        }
       
        //hash password
        const salt = randomBytes(8).toString('hex');
        const hash = await scrypt(password, salt, 64) as Buffer;
        const hashedPassword = salt + '.' + hash.toString('hex');
       
        // create user dan save
        const user = await this.usersService.create(name, email, hashedPassword);
        return user;
    
    }

    async login(email: string, password: string) {
        const [user] = await this.usersService.find(email);
        if (!user) {    
            throw new NotFoundException('Email tidak terdaftar');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = await scrypt(password, salt, 64) as Buffer;
        if (storedHash !== hash.toString('hex')) {
            throw new NotFoundException('Password salah');
        }
        return user;
    }
}

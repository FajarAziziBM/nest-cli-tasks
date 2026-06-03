import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    findAll() {
        return this.userRepository.find();
    }

    create(name: string, email: string, password: string) {
        const user = this.userRepository.create({ name, email, password });
        return this.userRepository.save(user);
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: number, attrs: Partial<User>) {  
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, attrs);
        return this.userRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('User not found');
        }
        return this.userRepository.remove(user);
    }

}


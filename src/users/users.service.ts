import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
    findOneBy(userId: any) {
        throw new Error("Method not implemented.");
    }
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    // GET ALL USERS
    findAll() {
        return this.userRepository.find();
    }

    find(email: string) {
        return this.userRepository.find({ where: { email } });
    }

    // CREATE USER (REGISTER)
    create(name: string, email: string, password: string) {
        const user = this.userRepository.create({ name, email, password });
        return this.userRepository.save(user);
    }

    // FIND ONE USER BY ID
    async findOne(id: number) {
        if (!id) {
            throw new NotFoundException('User not found');
        }
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async findOneWithoutException(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    // UPDATE USER
    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, attrs);
        return this.userRepository.save(user);
    }

    // DELETE USER
    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('User not found');
        }
        return this.userRepository.remove(user);
    }
}

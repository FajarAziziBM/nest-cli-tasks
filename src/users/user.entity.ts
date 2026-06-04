import { Exclude } from 'class-transformer';
import {
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log(`User with id ${this.id} has been inserted.`);
    }
    @AfterUpdate()
    logUpdate() {
        console.log(`User with id ${this.id} has been updated.`);
    }
    @AfterRemove()
    logRemove() {
        console.log(`User with id ${this.id} has been removed.`);
    }
}
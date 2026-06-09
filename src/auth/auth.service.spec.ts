import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

describe('AuthService', () => {

  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;


  beforeEach(async () => {
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const user = users.filter(
          (user) => user.email === email,
        );

        return Promise.resolve(user);
      },
      create: (
        name: string,
        email: string,
        password: string
      ) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          name,
          email,
          password
        } as User;

        users.push(user);
        return Promise.resolve(user);
      }
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = await service.register(
      'admintesting',
      'admintesting@example.com',
      'password'
    );
    expect(user.name).toBe('admintesting');
    expect(user.password).not.toEqual('password');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();

  });

  it('should fail to create a new user with an existing email', async () => {
    await service.register(
      'admin',
      'admin@example',
      'password',
    )
    await expect(
      service.register('admin', 'admin@example', 'password'),
    ).rejects.toThrow('email in use');
  });

  it('should fail if user login in with invalid email', async () => {
    await expect(
      service.login('admin@example.com', 'password'),
    ).rejects.toThrow('Email tidak terdaftar');
  });


  it('should fail if user login in with invalid password', async () => {
    await service.register(
      'admin',
      'admin@example',
      'password',
    )
    await expect(
      service.login('admin@example', 'tes132'),
    ).rejects.toThrow('Password salah');
  });

  it('should login exinting user', async () => {
    
    await service.register(
      'admin',
      'admin@example',
      'password',
    );

    const user = await service.login(
      'admin@example',
      'password',
    );

    expect(user).toBeDefined();
  });
});

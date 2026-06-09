import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    // Mock UsersService karena tidak digunakan langsung pada test controller
    fakeUserService = {};

    // Mock AuthService untuk menghindari akses database dan logic asli
    fakeAuthService = {
      login(email: string, password: string) {
        return Promise.resolve({
          id: 1,
          email,
          password,
        } as User);
      },

      register(
        name: string,
        email: string,
        password: string,
      ) {
        return Promise.resolve({
          id: 2,
          name,
          email,
          password,
        } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  // Memastikan controller berhasil dibuat oleh NestJS
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a user login and set session userId', async () => {
      // Simulasi session sebelum login
      const session = {
        userId: -10,
      };

      // Memanggil endpoint login
      const user = await controller.login(
        {
          email: 'email@example.com',
          password: 'password',
        },
        session,
      );

      // Memastikan data user yang dikembalikan sesuai
      expect(user).toEqual({
        id: 1,
        email: 'email@example.com',
        password: 'password',
      });

      // Memastikan session diperbarui dengan id user
      expect(session.userId).toEqual(1);
    });
  });

  describe('register', () => {
    it('should register a user and set session userId', async () => {
      // Simulasi session sebelum registrasi
      const session = {
        userId: null,
      };

      // Memanggil endpoint register
      const user = await controller.register(
        {
          name: 'admin',
          email: 'admin@example.com',
          password: 'password',
        },
        session,
      );

      // Memastikan user berhasil dibuat
      expect(user).toEqual({
        id: 2,
        name: 'admin',
        email: 'admin@example.com',
        password: 'password',
      });

      // Memastikan session menyimpan id user yang baru dibuat
      expect(session.userId).toEqual(2);
    });
  });

  describe('logout', () => {
    it('should clear the session userId', () => {
      // Simulasi user yang sudah login
      const session = {
        userId: 10,
      };

      // Memanggil endpoint logout
      controller.logout(session);

      // Memastikan session user dihapus
      expect(session.userId).toBeNull();
    });
  });

  describe('whoAmI', () => {
    it('should return the current user', async () => {
      // Simulasi user yang diinject oleh CurrentUserInterceptor
      const user = {
        id: 1,
        name: 'admin',
        email: 'admin@example.com',
      } as User;

      // Memanggil endpoint whoami
      const result = await controller.whoAmI(user);

      // Memastikan user yang dikembalikan sama dengan user saat ini
      expect(result).toEqual(user);
    });
  });
});
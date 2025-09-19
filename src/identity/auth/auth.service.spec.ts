import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SqlEntityManager } from '@mikro-orm/sqlite';
import { UserStatus } from '../users/entities/user-status.enum';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

// ✅ Mock bcrypt globally
jest.mock('bcrypt', () => ({
  hash: jest.fn(async (password: string) => 'hashed-secret'),
  compare: jest.fn(async (password: string, hashed: string) => true),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;
  let emMock: Partial<SqlEntityManager>;

  beforeEach(async () => {
    // Mock SqlEntityManager before service instantiation
    emMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      persistAndFlush: jest.fn().mockResolvedValue(undefined),
    };

    usersService = { findOne: jest.fn(), create: jest.fn() };
    jwtService = { sign: jest.fn().mockReturnValue('mocked-jwt-token') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        { provide: SqlEntityManager, useValue: emMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should create and return a user', async () => {
      const dto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        password: 'secret',
        status: UserStatus.Active,
      };

      const mockedUser = {
        id: 1,
        ...dto,
        password: 'hashed-secret', // what your create method hashes it to
      };

      // Mock UsersService.create
      (usersService.create as jest.Mock).mockResolvedValue(mockedUser);

      const result = await service.register(dto);

      expect(usersService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockedUser);
    });
  });

  describe('validateUser', () => {
    it('should return user without password if credentials are valid', async () => {
      const user: any = {
        id: 1,
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        password: 'hashed-secret',
        status: UserStatus.Active,
      };

      emMock.findOne = jest.fn().mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('johndoe', 'secret');

      expect(result).toEqual(user);
    });


    it('should throw if user not found', async () => {
      (emMock.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.validateUser('johndoe', 'secret'))
        .rejects
        .toThrow('Invalid credentials');
    });

    it('should throw if password does not match', async () => {
      const user: any = {
        id: 1,
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        password: 'hashed-secret',
        status: UserStatus.Active,
      };

      (emMock.findOne as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.validateUser('johndoe', 'wrong'))
        .rejects
        .toThrow('Invalid credentials');
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user: any = { id: 1, username: 'johndoe' };

      const result = await service.login(user as any);
      expect(result).toEqual({ access_token: 'mocked-jwt-token' });
      expect(jwtService.sign).toHaveBeenCalledWith({ username: 'johndoe', sub: 1 });
    });
  });
});

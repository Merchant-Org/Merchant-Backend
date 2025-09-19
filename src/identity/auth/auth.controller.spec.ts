import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserStatus } from '../users/entities/user-status.enum';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    authService = {
      register: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.register and return user', async () => {
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
        password: 'hashed-secret',
      };

      (authService.register as jest.Mock).mockResolvedValue(mockedUser);

      const result = await controller.register(dto);

      expect(authService.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockedUser);
    });
  });

  describe('login', () => {
    it('should call authService.login and return access token', async () => {
      const mockedUser = {
        id: 1,
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        status: UserStatus.Active,
        password: 'hashed-secret',
      };

      const mockedToken = { access_token: 'mocked-jwt-token' };

      // Mock the service
      (authService.login as jest.Mock).mockResolvedValue(mockedToken);

      // Mock the request object with the user
      const req = { user: mockedUser };

      const result = await controller.login(req);

      expect(authService.login).toHaveBeenCalledWith(mockedUser);
      expect(result).toEqual(mockedToken);
    });
  });
});

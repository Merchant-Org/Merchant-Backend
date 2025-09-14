import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { EntityRepository } from '@mikro-orm/sqlite';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from './entities/user-status.enum';
import { UpdateUserDto } from './dto/update-user.dto';

type MockRepo<T extends object> = Partial<
  Record<keyof EntityRepository<T>, jest.Mock>
>;

const mockUserRepo = (): MockRepo<User> => ({
  create: jest.fn(),
  getEntityManager: jest.fn().mockReturnValue({ flush: jest.fn() }),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findOneOrFail: jest.fn(),
  assign: jest.fn(),
  getReference: jest.fn(),
  nativeDelete: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepo<User>;

  const hashedPassword = 'hashedpassword';

  const mockUser: User = {
    id: 1,
    firstName: 'foo',
    lastName: 'bar',
    username: 'moe',
    email: 'foo@bar.com',
    password: 'hashedpassword',
    status: UserStatus.Active,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));

    jest.spyOn(service, 'hashPassword').mockResolvedValue(hashedPassword);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user and hash the password', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'foo',
        lastName: 'bar',
        username: 'moe',
        email: 'foo@bar.com',
        password: 'password123',
        status: UserStatus.Active,
      };

      userRepository.create!.mockReturnValue(new User());
      userRepository.getEntityManager!().flush.mockResolvedValue(undefined);

      const user = await service.create(createUserDto);

      expect(userRepository.create).toHaveBeenCalledWith(createUserDto, {
        partial: true,
      });
      expect(service.hashPassword).toHaveBeenCalledWith(createUserDto.password);
      expect(user.password).toBe(hashedPassword);
      expect(userRepository.getEntityManager!().flush).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [mockUser];
      userRepository.findAll!.mockResolvedValue(users);

      const result = await service.findAll();

      expect(userRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      userRepository.findOne!.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(userRepository.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update and return a user', async () => {
      const updateUserDto: UpdateUserDto = { username: 'new_moe' };

      userRepository.findOneOrFail!.mockResolvedValue(mockUser);
      userRepository.getEntityManager!().flush.mockResolvedValue(undefined);

      const result = await service.update(1, updateUserDto);

      expect(userRepository.findOneOrFail).toHaveBeenCalledWith(1);
      expect(userRepository.assign).toHaveBeenCalledWith(
        { id: 1 },
        updateUserDto,
      );
      expect(userRepository.getEntityManager!().flush).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });

    it('should hash password if provided', async () => {
      const updateUserDto: UpdateUserDto = { password: 'newpassword' };

      userRepository.findOneOrFail!.mockResolvedValue(mockUser);
      userRepository.getEntityManager!().flush.mockResolvedValue(undefined);

      await service.update(1, updateUserDto);

      expect(service.hashPassword).toHaveBeenCalledWith(updateUserDto.password);
      expect(mockUser.password).toBe(hashedPassword);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userRef = { id: 1 };
      userRepository.getReference!.mockReturnValue(userRef as User);
      userRepository.nativeDelete!.mockResolvedValue(1);

      await service.remove(1);

      expect(userRepository.getReference).toHaveBeenCalledWith(1);
      expect(userRepository.nativeDelete).toHaveBeenCalledWith(userRef);
    });
  });
});

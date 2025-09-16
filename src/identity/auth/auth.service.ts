import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UserStatus } from '../users/entities/user-status.enum';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly em: EntityManager, private readonly jwtService: JwtService) {}

  async register(data: RegisterDto): Promise<User> {
    const exists = await this.em.findOne(User, { username: data.username });
    if (exists) {
      throw new BadRequestException('User already exists');
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const user = this.em.create(User, {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: hashed,
        status: UserStatus.Active,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    await this.em.persistAndFlush(user);
    return user;
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.em.findOne(User, { username });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const payload = { username: user.username, sub: user.id};

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

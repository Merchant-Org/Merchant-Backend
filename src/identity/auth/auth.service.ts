import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { LoginResponseDto } from './dto/login-response.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly em: EntityManager, private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async register(data: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(data);
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

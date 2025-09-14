import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/sqlite';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserStatus } from 'src/users/entities/user-status.enum';

@Injectable()
export class AuthService {
  constructor(private readonly em: EntityManager) {}

  async register(data: {firstName: string; lastName: string; username: string; password: string}): Promise<User> {
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

  async login(data: {username: string; password: string}): Promise<User> {
    const user = await this.em.findOne(User, { username: data.username });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare( data.password, user.password);
    if(!valid) {
        throw new UnauthorizedException('Invalid credentials')
    }
    return user;
  }
}

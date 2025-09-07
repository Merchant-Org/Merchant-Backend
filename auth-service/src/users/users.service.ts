import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor( private readonly em: EntityManager ) {}
  
  async index() {
    return this.em.findAll(User);
  }
  
  async show(id: number) {
    const user = await this.em.findOne(User, { id });

    return user;
  }
  
  async store(username: string, password: string) {
    console.log(`@${username}:${password}`);

    const data = {
      username,
      password: await bcrypt.hash(password, 10)
    } as User;

    const user = this.em.create(User, data);
    
    this.em.flush();
    return user;
  }

  async update(id: number, username: string, password: string) {
    const user = await this.em.findOne(User, { id });

    user?.assign({
      username,
      password: await bcrypt.hash(password, 10)
    });

    this.em.flush();
    return user;
  }

  async destroy(id: number) {
    const user = await this.em.findOne(User, { id });

    if (!user) return null;

    this.em.flush();
    this.em.remove(user);
  }
}
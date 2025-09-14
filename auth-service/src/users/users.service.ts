import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
  ) {}

  async hashPassword(raw: string) {
    return bcrypt.hash(raw, 10);
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto, { partial: true });
    user.password = await this.hashPassword(createUserDto.password);
    await this.userRepo.getEntityManager().flush();
    return user;
  }

  async findAll() {
    return this.userRepo.findAll();
  }

  async findOne(id: number) {
    return this.userRepo.findOne({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneOrFail(id);
    this.userRepo.assign({ id }, updateUserDto);
    if (updateUserDto.password)
      user.password = await this.hashPassword(updateUserDto.password);
    await this.userRepo.getEntityManager().flush();
    return user;
  }

  async remove(id: number) {
    const user = this.userRepo.getReference(id);
    return this.userRepo.nativeDelete(user);
  }
}

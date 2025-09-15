import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { FileStorageService } from '@getlarge/nestjs-tools-file-storage';
import { extname } from 'path';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,

    @Inject(FileStorageService)
    private readonly fileStorageService: FileStorageService
  ) {}

  async hashPassword(raw: string) {
    return bcrypt.hash(raw, 10);
  }

  async create(createUserDto: CreateUserDto, avatar?: Express.Multer.File) {
    const user = this.userRepo.create(createUserDto, { partial: true });
    user.password = await this.hashPassword(createUserDto.password);

    if (avatar) {
      const filePath = `avatar/${Date.now()}-${Math.round(Math.random() * 1e9)}.${extname(avatar.originalname)}`;
      this.fileStorageService.uploadFile({
        content: avatar.buffer,
        filePath: filePath
      });

      user.avatarUrl = filePath;
    }

    await this.userRepo.getEntityManager().flush();

    return user;
  }

  async findAll() {
    return this.userRepo.findAll();
  }

  async findOne(id: number) {
    return this.userRepo.findOne({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto, avatar?: Express.Multer.File) {
    const user = await this.userRepo.findOneOrFail(id);
    this.userRepo.assign(user, updateUserDto);
    if (updateUserDto.password)
      user.password = await this.hashPassword(updateUserDto.password);

    if (avatar) {
      const filePath = user.avatarUrl || `avatar/${Date.now()}-${Math.round(Math.random() * 1e9)}.${extname(avatar.originalname)}`;
      this.fileStorageService.uploadFile({
        content: avatar.buffer,
        filePath: filePath
      });

      user.avatarUrl = filePath;
    }

    await this.userRepo.getEntityManager().flush();
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneOrFail(id);
    if (user.avatarUrl) this.fileStorageService.deleteFile({
      filePath: user.avatarUrl
    });
    return this.userRepo.nativeDelete(user);
  }
}

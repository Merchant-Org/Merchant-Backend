import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { FileStorageModule } from '@getlarge/nestjs-tools-file-storage';
import fileStorageConfig from '../storage.config';


@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    FileStorageModule.forRootAsync(fileStorageConfig)
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
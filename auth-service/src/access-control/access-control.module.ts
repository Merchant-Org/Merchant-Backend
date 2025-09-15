import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [MikroOrmModule.forFeature([
    Permission,
    Role
  ])]
})
export class AccessControlModule {}

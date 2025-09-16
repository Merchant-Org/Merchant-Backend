import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccessControlModule } from './access-control/access-control.module';


@Module({
  imports: [AuthModule, UsersModule, AccessControlModule]
})
export class IdentityModule {}

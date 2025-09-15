import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PoliciesModule } from './policies/policies.module';
import { AccessControlModule } from './access-control/access-control.module';
import mikroOrmConfig from './mikro-orm.config';


@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    UsersModule, AuthModule, RolesModule, PermissionsModule, PoliciesModule, AccessControlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

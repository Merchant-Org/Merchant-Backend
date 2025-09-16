import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import mikroOrmConfig from './mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { YourModuleNameModule } from './your-module-name/your-module-name.module';
import { StoreModule } from './store/store.module';
import { Tiers\storeService } from './tiers/store/tiers/store.service';
import { TiersService } from './tiers/tiers.service';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: './.env'}),
    MikroOrmModule.forRoot(mikroOrmConfig),
    IdentityModule,
    YourModuleNameModule,
    StoreModule
  ],
  controllers: [AppController],
  providers: [AppService, Tiers\storeService, TiersService],
})
export class AppModule {}

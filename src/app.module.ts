import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import mikroOrmConfig from './mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { StoreModule } from './store/store.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: './.env'}),
    MikroOrmModule.forRoot(mikroOrmConfig),
    IdentityModule,
    StoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

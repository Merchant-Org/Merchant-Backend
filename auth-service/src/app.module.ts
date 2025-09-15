import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import mikroOrmConfig from './mikro-orm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, envFilePath: '../.env'}),
     MikroOrmModule.forRoot(mikroOrmConfig), 
     UsersModule, 
     AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

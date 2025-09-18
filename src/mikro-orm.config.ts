import { SqliteDriver } from '@mikro-orm/sqlite';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import * as dotenv from 'dotenv';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';


dotenv.config();

const isDebug: boolean = process.env.DEBUG === 'true';

const config: MikroOrmModuleOptions = {
  driver: isDebug ? SqliteDriver : PostgreSqlDriver,
  dbName: isDebug ? 'test.sqlite3' : process.env.DB_NAME || 'merchant',
  host: isDebug ? undefined : process.env.DB_HOST || '127.0.0.1',
  port: isDebug ? undefined : Number(process.env.DB_PORT) || 5432,
  user: isDebug ? undefined : process.env.DB_USER || 'merchant',
  password: isDebug ? undefined : process.env.DB_PASS || 'merchant',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: isDebug,
};

export default config;

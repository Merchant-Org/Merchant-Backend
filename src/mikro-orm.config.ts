import { SqliteDriver } from '@mikro-orm/sqlite';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

const config: MikroOrmModuleOptions = {
  driver: SqliteDriver,
  dbName: 'test.sqlite3',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
};

export default config;

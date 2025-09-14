import { SqliteDriver } from '@mikro-orm/sqlite';
import { User } from "./users/entities/user.entity";
import { MikroOrmModuleOptions } from "@mikro-orm/nestjs";


const config: MikroOrmModuleOptions = {
  driver: SqliteDriver,
  dbName: 'test.sqlite3',
  entities: [User],
  debug: true
};

export default config;

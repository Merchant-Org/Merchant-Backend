import { SqliteDriver } from '@mikro-orm/sqlite';
import { User } from './users/entities/user.entity';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Permission } from './access-control/entities/permission.entity';
import { Role } from './access-control/entities/role.entity';

const config: MikroOrmModuleOptions = {
  driver: SqliteDriver,
  dbName: '../test.sqlite3',
  entities: [User, Permission, Role],
  debug: true,
};

export default config;

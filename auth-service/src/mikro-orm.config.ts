import { MikroOrmModuleOptions } from "@mikro-orm/nestjs";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User } from "./users/entities/user.entity";


const config: MikroOrmModuleOptions = {
  entities: [User],
  dbName: 'merchant',
  user: 'merchant',
  password: 'merchant',
  host: 'localhost',
  port: 5432,
  driver: PostgreSqlDriver,
  debug: true
};

export default config;
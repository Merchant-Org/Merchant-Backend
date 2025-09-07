import { Migration } from '@mikro-orm/migrations';

export class Migration20250906145904 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "auth";`);
    this.addSql(`create table "auth"."user" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "auth"."user" cascade;`);

    this.addSql(`drop schema if exists "auth";`);
  }

}

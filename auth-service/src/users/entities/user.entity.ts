import { Entity, PrimaryKey, Property, Opt, BaseEntity } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';


@Entity({ schema: 'auth' })
export class User extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({
    onUpdate: () => new Date()
  })
  updatedAt: Date & Opt = new Date();

  async checkPassword(raw: string) {
    return bcrypt.compare(raw, this.password);
  }
}
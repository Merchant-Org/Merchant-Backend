import { BaseEntity, Entity, PrimaryKey, Property } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';


@Entity()
export class User extends BaseEntity {
  @PrimaryKey()
  id: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  username: string;

  @Property({ nullable: true })
  email?: string;

  @Property({ nullable: true })
  phone?: string;

  @Property({ nullable: true })
  avatarUrl?: string;

  @Property({ hidden: true })
  password: string;

  @Property()
  createdAt: Date = new Date;

  @Property({
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date;

  async setPassword(raw: string) {
    this.password = await bcrypt.hash(raw, 10);
  }

  async checkPassword(raw: string) {
    return bcrypt.compare(raw, this.password);
  }
}

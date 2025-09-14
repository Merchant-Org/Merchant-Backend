import {
  BaseEntity,
  Entity,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UserStatus } from './user-status.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryKey()
  id: number;

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

  @Enum(() => UserStatus)
  status: UserStatus = UserStatus.Active;

  @Property()
  createdAt: Date = new Date();

  @Property({
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}

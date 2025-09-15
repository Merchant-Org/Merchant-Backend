import {
  BaseEntity,
  Entity,
  Enum,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { UserStatus } from './user-status.enum';
import { Role } from '../../access-control/entities/role.entity';


@Entity()
export class User extends BaseEntity {
  @PrimaryKey()
  id: number;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property({ unique: true})
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

  @ManyToMany(() => Role, role => role.users, { owner: true })
  roles: Role[];
}

import { Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../../users/entities/user.entity";
import { Permission } from "./permission.entity";
import { Store } from "../../../store/entities/store.entity";


@Entity()
export class Role {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @ManyToOne(() => Store, { nullable: true })
  store?: Store;

  @ManyToMany(() => User, user => user.roles)
  users: User[];

  @ManyToMany(() => Permission, permission => permission.roles)
  permissions: Permission[];
}
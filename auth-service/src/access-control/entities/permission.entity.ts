import { Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Role } from "./role.entity";


@Entity()
export class Permission {
  @PrimaryKey()
  id: number;

  @Property()
  description: string;

  @ManyToMany(() => Role, role => role.permissions, { owner: true })
  roles: Role[];
}
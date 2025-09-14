import { Entity, PrimaryKey, Property } from '@mikro-orm/core';


@Entity()
export class User {
  @PrimaryKey()
  id: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  username: string;

  @Property()
  createdAt: Date = new Date;

  @Property({
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date;
}

import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Tier {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    price!: number;
}
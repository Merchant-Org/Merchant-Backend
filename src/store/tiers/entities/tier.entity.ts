import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Store } from '../../entities/store.entity';

@Entity()
export class Tier {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    price!: number;

    @OneToMany(() => Store, store => store.tier)
    stores: Store[];
}
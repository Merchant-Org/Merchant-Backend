import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Tier } from './tier.entity';

@Entity()
export class StoreTier {
    @PrimaryKey()
    id!: number;

    @Property()
    storeID!: number;

    @Property()
    tier!: Tier;
}

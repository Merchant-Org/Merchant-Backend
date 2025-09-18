import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Tier } from './tier.entity';
import { Store } from '../../entities/store.entity';

@Entity()
export class StoreTier {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Store)
    store!: Store;

    @ManyToOne(() => Tier)
    tier!: Tier;
    
}

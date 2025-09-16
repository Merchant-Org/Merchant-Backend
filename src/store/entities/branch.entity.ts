import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Store } from './store.entity';

@Entity()
export class Branch {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    address!: string;

    @ManyToOne(() => Store)
    store!: Store;
}
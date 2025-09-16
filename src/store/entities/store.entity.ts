import { Entity, PrimaryKey, Property, OneToMany, Collection } from "@mikro-orm/core";
import { Branch } from "./branch.entity";

@Entity()
export class Store {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property({ nullable: true })
    description?: string;

    @OneToMany(() => Branch, branch => branch.store)
    branches = new Collection<Branch>(this);
}
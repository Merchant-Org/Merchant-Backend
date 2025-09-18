import { Entity, PrimaryKey, Property, OneToMany, Collection, ManyToOne } from "@mikro-orm/core";
import { Branch } from "./branch.entity";
import { Role } from "../../identity/access-control/entities/role.entity";
import { Tier } from "../tiers/entities/tier.entity";

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

    @OneToMany(() => Role, role => role.store)
    roles: Role[];

    @ManyToOne(() => Tier)
    tier: Tier;
}
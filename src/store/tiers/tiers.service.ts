import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Tier } from './entities/tier.entity';


@Injectable()
export class TiersService {
    constructor(
        @InjectRepository(Tier)
        private readonly tierRepo: EntityRepository<Tier>,
    ) {}

    async getTiers() {
        return this.tierRepo.findAll();
    }

    async createTiers(storeID: number, tierId: number) {
        const tier = this.tierRepo.create({ store: { id: storeID }, tierId });
        await this.tierRepo.getEntityManager().flush();
        return tier;
    }
}


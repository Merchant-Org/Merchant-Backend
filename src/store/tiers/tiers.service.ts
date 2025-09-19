import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Tier } from './entities/tier.entity';
import { Store } from '../entities/store.entity';


@Injectable()
export class TiersService {
    constructor(
        @InjectRepository(Tier)
        private readonly tierRepo: EntityRepository<Tier>,
        @InjectRepository(Store)
        private readonly storeRepo: EntityRepository<Store>,
    ) {}

    async getTiers() {
        return this.tierRepo.findAll();
    }

    async subscribe(storeID: number, tierID: number) {
        const tier = await this.tierRepo.findOneOrFail(tierID);
        const store = await this.storeRepo.findOneOrFail(storeID);

        tier.stores.push(store);

        await this.tierRepo.getEntityManager().flush();
    }
}


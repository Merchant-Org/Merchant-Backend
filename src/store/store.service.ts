import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Store } from './entities/store.entity';
import { Branch } from './entities/branch.entity';

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store)
        private readonly storeRepo: EntityRepository<Store>,
        @InjectRepository(Branch)
        private readonly branchRepo: EntityRepository<Branch>,
    ) {}

    async createStore(name: string, description?: string) {
        const store = this.storeRepo.create({ name, description });
        await this.storeRepo.getEntityManager().flush();
        return store;
    }

    async addBranch(storeId: number, name: string, address: string) {
        const store = await this.storeRepo.findOneOrFail(storeId);
        const branch = this.branchRepo.create({ name, address, store });
        await this.branchRepo.getEntityManager().flush();
        return branch;
    }

    async getStores() {
        return this.storeRepo.findAll({ populate: ['branches'] });
    }

    async getBranches(storeId: number) {
        return this.branchRepo.find({ store: { id: storeId } });
    }
}
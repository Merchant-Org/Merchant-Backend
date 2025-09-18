import { Module } from '@nestjs/common';
import { TiersModule } from './tiers/tiers.module';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Store } from './entities/store.entity';
import { Branch } from './entities/branch.entity';

@Module({
    imports: [
        MikroOrmModule.forFeature([Store, Branch]),
        TiersModule
    ],
    controllers: [StoreController],
    providers: [StoreService]
})
export class StoreModule {}

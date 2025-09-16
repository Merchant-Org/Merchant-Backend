import { Module } from '@nestjs/common';
import { TiersModule } from './tiers/tiers.module';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
    imports: [TiersModule],
    controllers: [StoreController],
    providers: [StoreService]
})
export class StoreModule {}

import { Module } from '@nestjs/common';
import { TiersService } from './tiers.service';
import { TiersController } from './tiers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tier } from './entities/tier.entity';
import { Store } from '../entities/store.entity';

@Module({
    imports: [
        MikroOrmModule.forFeature([Tier, Store])
    ],
    controllers: [TiersController],
    providers: [TiersService],
})
export class TiersModule {}

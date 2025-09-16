import { Module } from '@nestjs/common';
import { TiersService } from './tiers.service';
import { TiersController } from './tiers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tier } from './entities/tier.entity';

@Module({
    imports: [
        MikroOrmModule.forFeature([Tier])
    ],
    controllers: [TiersController],
    providers: [TiersService],
})
export class TiersModule {}

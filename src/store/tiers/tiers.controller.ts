import { Controller, Get, Post, Body } from '@nestjs/common';
import { TiersService } from './tiers.service';

@Controller('tiers')
export class TiersController {
    constructor(private readonly tiersService: TiersService) {}

    @Get("tiers")
    getTiers() {
        return this.tiersService.getTiers();
    }

    @Post("tiers")
    subscribe(@Body() body: { storeID: number, tierId: number }) {
        return this.tiersService.subscribe(body.storeID, body.tierId);
    }
}


import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller("stores")
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post()
    createStore(@Body() body: { name: string; description?: string }) {
        return this.storeService.createStore(body.name, body.description);
    }

    @Get()
    getStores() {
        return this.storeService.getStores();
    }

    @Post(":storeId/branches")
    addBranch(
        @Param("storeId") storeId: number,
        @Body() body: { name: string; address: string }
    ) {
        return this.storeService.addBranch(storeId, body.name, body.address);
    }

    @Get(":storeId/branches")
    getBranches(@Param("storeId") storeId: number) {
        return this.storeService.getBranches(storeId);
    }
}
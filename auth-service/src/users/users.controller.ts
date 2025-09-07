import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor( private readonly userService: UsersService ) {}

  @Get()
  async index() {
    return this.userService.index();
  }

  @Post()
  async store(@Body() data) {
    return this.userService.store(data.username, data.password);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return this.userService.show(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data) {
    return this.userService.update(+id, data.username, data.password);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    return this.userService.destroy(+id);
  }
}

import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { CreateUserDto, GetUsersDto } from '../dto';
import { UsersService } from '../services';
import { PaginatedResult } from 'shared/interfaces';
import { UserEntity } from '../entities';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Post()
  private async createUser(@Body() input: CreateUserDto): Promise<UserEntity> {
    return await this.usersService.createUser(input);
  }

  @Get()
  private async getUsers(@Query() input: GetUsersDto): Promise<PaginatedResult<UserEntity>> {
    return await this.usersService.getUsers(input);
  }
}

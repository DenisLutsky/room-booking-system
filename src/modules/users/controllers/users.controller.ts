import { Controller, Post, Body, Get, Query, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';

import { PaginatedResult } from 'shared/interfaces';
import { CreateUserDto, GetUsersDto } from '../dto';
import { UserEntity } from '../entities';
import { UsersService } from '../services';

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

  @Get(':userId')
  private async getUser(@Param('userId', ParseIntPipe) userId: number): Promise<UserEntity> {
    return await this.usersService.getOneUserById(userId);
  }

  @Patch(':userId')
  private async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() input: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.usersService.updateUser(userId, input);
  }

  @Delete(':userId')
  private async deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
    return await this.usersService.deleteUser(userId);
  }
}

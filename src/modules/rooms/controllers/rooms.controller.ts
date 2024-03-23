import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { CreateRoomDto, GetRoomsDto } from '../dto';
import { RoomEntity } from '../entities';
import { RoomsService } from '../services';
import { PaginatedResult } from 'shared/interfaces';

@Controller('rooms')
export class RoomsController {
  public constructor(private readonly roomsService: RoomsService) {}

  @Post()
  private async createRoom(@Body() input: CreateRoomDto): Promise<RoomEntity> {
    return await this.roomsService.createRoom(input);
  }

  @Get()
  private async getRooms(@Query() input: GetRoomsDto): Promise<PaginatedResult<RoomEntity>> {
    return await this.roomsService.getRooms(input);
  }
}

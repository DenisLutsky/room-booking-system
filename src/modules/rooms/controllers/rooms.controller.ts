import { Controller, Post, Body, Get, Query, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';

import { PaginatedResult } from 'shared/interfaces';
import { CreateRoomDto, GetRoomsDto, UpdateRoomDto } from '../dto';
import { RoomEntity } from '../entities';
import { RoomsService } from '../services';

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

  @Get(':roomId')
  private async getRoom(@Param('roomId', ParseIntPipe) roomId: number): Promise<RoomEntity> {
    return await this.roomsService.getRoom(roomId);
  }

  @Patch(':roomId')
  private async updateRoom(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() input: UpdateRoomDto,
  ): Promise<RoomEntity> {
    return await this.roomsService.updateRoom(roomId, input);
  }

  @Delete(':roomId')
  private async deleteRoom(@Param('roomId', ParseIntPipe) roomId: number): Promise<void> {
    return await this.roomsService.deleteRoom(roomId);
  }
}

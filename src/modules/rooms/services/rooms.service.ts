import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { PaginatedResult, Pagination } from 'shared/interfaces';
import { Room } from '../interfaces';
import { RoomEntity } from '../entities';
import { RoomsRepository } from '../repositories';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  public constructor(private readonly roomsRepository: RoomsRepository) {}

  public async createRoom(input: Room): Promise<RoomEntity> {
    this.logger.log(`Creating a new room`);

    return await this.roomsRepository.insertRoom(input);
  }

  public async getRooms(input: Pagination): Promise<PaginatedResult<RoomEntity>> {
    this.logger.log(`Fetching rooms`);

    return await this.roomsRepository.selectRooms(input);
  }

  public async getRoom(roomId: number): Promise<RoomEntity> {
    this.logger.log(`Fetching room ${roomId}`);

    const room = await this.roomsRepository.selectRoom(roomId);
    if (!room) throw new NotFoundException(`Room with ID ${roomId} not found`);

    return room;
  }

  public async updateRoom(roomId: number, input: Partial<Room>): Promise<RoomEntity> {
    this.logger.log(`Updating room ${roomId}`);

    const room = await this.roomsRepository.selectRoom(roomId);
    if (!room) throw new NotFoundException(`Room with ID ${roomId} not found`);

    return await this.roomsRepository.updateRoom(room, input);
  }

  public async deleteRoom(roomId: number): Promise<void> {
    this.logger.log(`Deleting room ${roomId}`);

    const room = await this.roomsRepository.selectRoom(roomId);
    if (!room) throw new NotFoundException(`Room with ID ${roomId} not found`);

    await this.roomsRepository.deleteRoom(room);
  }
}

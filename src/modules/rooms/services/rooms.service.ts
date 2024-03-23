import { Injectable, Logger } from '@nestjs/common';

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
}

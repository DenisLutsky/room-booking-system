import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery, FindOptions, MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { PaginatedResult, Pagination } from 'shared/interfaces';
import { Room } from '../interfaces';
import { CalendarEntity, RoomEntity } from '../entities';

@Injectable()
export class RoomsRepository {
  private readonly logger = new Logger(RoomsRepository.name);

  public constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {}

  public async insertRoom(input: Room): Promise<RoomEntity> {
    this.logger.log(`Inserting record for room ${input.name}`);

    return this.orm.em.transactional(async (em) => {
      const room = em.create(RoomEntity, input);
      const calendar = em.create(CalendarEntity, { room });

      await em.persistAndFlush([room, calendar]);

      return room;
    });
  }

  public async selectRooms(input: Pagination): Promise<PaginatedResult<RoomEntity>> {
    this.logger.log(`Selecting rooms`);

    const filter: FilterQuery<RoomEntity> = {};
    const options: FindOptions<RoomEntity> = {
      limit: input.limit,
      offset: (input.page - 1) * input.limit,
    };

    const [users, count] = await this.orm.em.findAndCount(RoomEntity, filter, options);

    return {
      items: users,
      count,
    };
  }

  public async selectRoom(roomId: number): Promise<RoomEntity> {
    this.logger.log(`Selecting room ${roomId}`);

    return await this.orm.em.findOne(RoomEntity, { roomId });
  }

  public async updateRoom(room: RoomEntity, input: Partial<Room>): Promise<RoomEntity> {
    this.logger.log(`Updating room ${room.roomId}`);

    room.assign(input);

    return room;
  }

  public async deleteRoom(room: RoomEntity): Promise<void> {
    this.logger.log(`Deleting room ${room.roomId}`);

    await this.orm.em.removeAndFlush(room);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery, FindOptions, MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { Room } from '../interfaces';
import { CalendarEntity, RoomEntity } from '../entities';
import { PaginatedResult, Pagination } from 'shared/interfaces';

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
}

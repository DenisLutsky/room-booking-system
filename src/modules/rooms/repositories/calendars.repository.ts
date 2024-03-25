import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery, MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { GetTimeSlotsInput, TimeSlot } from '../interfaces';
import { CalendarEntity, TimeSlotEntity } from '../entities';
import { ProductEntity } from 'modules/booking/entities';

@Injectable()
export class CalendarsRepository {
  private readonly logger = new Logger(CalendarsRepository.name);

  public constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {}

  public async insertTimeSlot(calendar: CalendarEntity, input: TimeSlot): Promise<TimeSlotEntity> {
    this.logger.log(`Inserting time slot record into calendar ${calendar.calendarId}`);

    return await this.orm.em.transactional(async (em) => {
      const timeSlot = em.create(TimeSlotEntity, { ...input, calendar });
      const product = em.create(ProductEntity, { price: input.product.price, timeSlot });

      await em.persistAndFlush([timeSlot, product]);

      return timeSlot;
    });
  }

  public async getTimeSlots(input: Partial<GetTimeSlotsInput>): Promise<TimeSlotEntity[]> {
    this.logger.log(`Selecting time slot records`);

    const filter: FilterQuery<TimeSlotEntity> = {};

    if (input.roomId) filter.calendar = { room: { roomId: input.roomId } };
    if (input.roomType) filter.calendar = { room: { type: input.roomType } };
    if (input.dateFrom || input.dateTo) {
      filter.date = { $gte: input.dateFrom || input.dateTo, $lte: input.dateTo || input.dateFrom };
    }
    if (input.timeFrom || input.timeTo) {
      filter.startTime = { $gte: input.timeFrom || input.timeTo, $lt: input.timeTo || input.timeFrom };
    }
    if (input.timeFrom || input.timeTo) {
      filter.endTime = { $gt: input.timeFrom || input.timeTo, $lte: input.timeTo || input.timeFrom };
    }

    // FIXME: Potentially might fetch big amount of data
    // find a way to limit the amount of time slots selected at once
    return await this.orm.em.find(TimeSlotEntity, filter);
  }
}

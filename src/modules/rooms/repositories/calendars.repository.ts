import { Injectable, Logger } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { TimeSlot } from '../interfaces';
import { CalendarEntity, TimeSlotEntity } from '../entities';

@Injectable()
export class CalendarsRepository {
  private readonly logger = new Logger(CalendarsRepository.name);

  public constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {}

  public async insertTimeSlot(calendar: CalendarEntity, input: TimeSlot): Promise<TimeSlotEntity> {
    this.logger.log(`Inserting time slot record into calendar ${calendar.calendarId}`);

    const timeSlot = this.orm.em.create(TimeSlotEntity, { ...input, calendar });
    await this.orm.em.persistAndFlush(timeSlot);

    return timeSlot;
  }
}

import {
  BaseEntity,
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OptionalProps,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/core';

import { Nullable } from 'shared/types';
import { TimeSlotStatus } from '../enums';
import { CalendarEntity } from './calendar.entity';

@Entity({ tableName: 'time_slots' })
export class TimeSlotEntity extends BaseEntity {
  @PrimaryKey({ name: 'id' })
  public timeSlotId!: number;

  @ManyToOne({
    entity: () => CalendarEntity,
    name: 'calendar_id',
    joinColumn: 'id',
    inversedBy: 'timeSlots',
    deleteRule: 'cascade',
  })
  public calendar!: Collection<CalendarEntity>;

  @Property({ name: 'date', columnType: 'date' })
  public date!: string;

  @Property({ name: 'start_time', columnType: 'time' })
  public startTime!: string;

  @Property({ name: 'end_time', columnType: 'time' })
  public endTime!: string;

  @Enum({ name: 'status', items: () => TimeSlotStatus, default: TimeSlotStatus.AVAILABLE })
  public status!: TimeSlotStatus;

  @Property({ name: 'reserved_at', columnType: 'timestamp', nullable: true, default: null })
  public reservedAt!: Nullable<Date>;

  @Property({ name: 'created_at', columnType: 'timestamp', defaultRaw: 'current_timestamp' })
  public createdAt!: Date;

  @Property({
    name: 'modified_at',
    columnType: 'timestamp',
    defaultRaw: 'current_timestamp',
    onUpdate: () => new Date(),
  })
  public modifiedAt!: Date;

  public [OptionalProps]?: 'timeSlotId' | 'reservedAt' | 'createdAt' | 'modifiedAt';

  public [PrimaryKeyProp]?: ['timeSlotId'];
}

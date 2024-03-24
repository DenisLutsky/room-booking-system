import {
  BaseEntity,
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  OptionalProps,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
  Ref,
} from '@mikro-orm/core';

import { RoomEntity } from './room.entity';
import { TimeSlotEntity } from './time-slot.entity';

@Entity({ tableName: 'calendars' })
export class CalendarEntity extends BaseEntity {
  @PrimaryKey({ name: 'id' })
  public calendarId!: number;

  @OneToOne({
    entity: () => RoomEntity,
    name: 'room_id',
    joinColumn: 'id',
    inversedBy: 'calendar',
    deleteRule: 'cascade',
    ref: true,
  })
  public room!: Ref<RoomEntity>;

  @OneToMany({ entity: () => TimeSlotEntity, name: 'time_slot_id', joinColumn: 'id', mappedBy: 'calendar' })
  public timeSlots!: Collection<TimeSlotEntity>;

  @Property({ name: 'created_at', columnType: 'timestamp', defaultRaw: 'current_timestamp' })
  public createdAt!: Date;

  @Property({
    name: 'modified_at',
    columnType: 'timestamp',
    defaultRaw: 'current_timestamp',
    onUpdate: () => new Date(),
  })
  public modifiedAt!: Date;

  public [OptionalProps]?: 'calendarId' | 'createdAt' | 'modifiedAt';

  public [PrimaryKeyProp]?: ['calendarId'];
}

import {
  BaseEntity,
  Entity,
  Enum,
  OneToOne,
  OptionalProps,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
  Ref,
} from '@mikro-orm/core';

import { Nullable } from 'shared/types';
import { RoomType } from '../enums';
import { CalendarEntity } from './calendar.entity';

@Entity({ tableName: 'rooms' })
export class RoomEntity extends BaseEntity {
  @PrimaryKey({ name: 'id' })
  public roomId!: number;

  @Property({ name: 'name', columnType: 'varchar(50)' })
  public name!: string;

  @Enum({ name: 'type', items: () => RoomType })
  public type!: RoomType;

  @Property({ name: 'area', columnType: 'int4' })
  public area!: number;

  @Property({ name: 'capacity', columnType: 'int4' })
  public capacity!: number;

  @OneToOne({ entity: () => CalendarEntity, name: 'calendar_id', joinColumn: 'id', mappedBy: 'room', ref: true })
  public calendar!: Ref<CalendarEntity>;

  @Property({ name: 'deleted', columnType: 'bool', default: false })
  public deleted!: boolean;

  @Property({ name: 'created_at', columnType: 'timestamp', defaultRaw: 'current_timestamp' })
  public createdAt!: Date;

  @Property({
    name: 'modified_at',
    columnType: 'timestamp',
    defaultRaw: 'current_timestamp',
    onUpdate: () => new Date(),
  })
  public modifiedAt!: Date;

  @Property({ name: 'deleted_at', columnType: 'timestamp', nullable: true, default: null })
  public deletedAt!: Nullable<Date>;

  public [OptionalProps]?: 'roomId' | 'deleted' | 'createdAt' | 'modifiedAt' | 'deletedAt';

  public [PrimaryKeyProp]?: ['roomId'];
}

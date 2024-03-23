import {
  BaseEntity,
  Entity,
  Enum,
  OneToOne,
  OptionalProps,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
} from '@mikro-orm/core';

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

  @OneToOne({ entity: () => CalendarEntity, name: 'calendar_id', joinColumn: 'id', mappedBy: 'room' })
  public calendar!: CalendarEntity;

  @Property({ name: 'deleted', columnType: 'bool', default: false })
  public deleted!: boolean;

  @Property({ name: 'created_at', columnType: 'timestamp', defaultRaw: 'current_timestamp' })
  public createdAt!: Date;

  @Property({ name: 'deleted_at', columnType: 'timestamp', defaultRaw: 'current_timestamp' })
  public deletedAt!: Date;

  @Property({
    name: 'modified_at',
    columnType: 'timestamp',
    defaultRaw: 'current_timestamp',
    onUpdate: () => new Date(),
  })
  public modifiedAt!: Date;

  public [OptionalProps]?: 'roomId' | 'deleted' | 'createdAt' | 'modifiedAt' | 'deletedAt';

  public [PrimaryKeyProp]?: ['roomId'];
}

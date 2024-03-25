import {
  BaseEntity,
  Entity,
  OneToOne,
  OptionalProps,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
  Ref,
} from '@mikro-orm/core';
import { TimeSlotEntity } from 'modules/rooms/entities';
import { Nullable } from 'shared/types';

@Entity({ tableName: 'products' })
export class ProductEntity extends BaseEntity {
  @PrimaryKey({ name: 'id' })
  public productId!: number;

  @Property({ name: 'price', columnType: 'int4' })
  public price!: number; // in cents

  @OneToOne({ name: 'time_slot_id', entity: () => TimeSlotEntity, inversedBy: 'product', ref: true })
  public timeSlot!: Ref<TimeSlotEntity>;

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

  public [OptionalProps]?: 'productId' | 'deleted' | 'createdAt' | 'modifiedAt' | 'deletedAt';

  public [PrimaryKeyProp]?: ['productId'];
}

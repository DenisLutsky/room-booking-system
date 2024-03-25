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
import { OrderStatus } from '../enums';
import { CartEntity } from './cart.entity';
import { InvoiceEntity } from 'modules/payment/entities';

@Entity({ tableName: 'orders' })
export class OrderEntity extends BaseEntity {
  @PrimaryKey({ name: 'id' })
  public orderId!: number;

  @OneToOne({ name: 'cart_id', entity: () => CartEntity, inversedBy: 'order', ref: true })
  public cart!: Ref<CartEntity>;

  @Enum({ name: 'status', items: () => OrderStatus, default: OrderStatus.PENDING })
  public status!: OrderStatus;

  @OneToOne({ name: 'invoice_id', entity: () => InvoiceEntity, mappedBy: 'order', nullable: true, ref: true })
  public invoice!: Nullable<Ref<InvoiceEntity>>;

  @Property({ name: 'created_at', columnType: 'timestamp', defaultRaw: 'current_timestamp' })
  public createdAt!: Date;

  @Property({
    name: 'modified_at',
    columnType: 'timestamp',
    defaultRaw: 'current_timestamp',
    onUpdate: () => new Date(),
  })
  public modifiedAt!: Date;

  public [OptionalProps]?: 'orderId' | 'createdAt' | 'modifiedAt';

  public [PrimaryKeyProp]?: ['orderId'];
}

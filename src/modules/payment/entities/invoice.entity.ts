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

import { InvoiceStatus } from '../enums';
import { OrderEntity } from 'modules/booking/entities';

@Entity({ tableName: 'invoices' })
export class InvoiceEntity extends BaseEntity {
  @PrimaryKey({ name: 'id' })
  public invoiceId!: number;

  @OneToOne({ name: 'order_id', entity: () => OrderEntity, inversedBy: 'invoice', ref: true })
  public order!: Ref<OrderEntity>;

  @Enum({ name: 'status', items: () => InvoiceStatus, default: InvoiceStatus.PENDING })
  public status!: InvoiceStatus;

  @Property({ name: 'token', columnType: 'varchar(36)' })
  public token!: string;

  @Property({ name: 'created_at', columnType: 'timestamp', defaultRaw: 'current_timestamp' })
  public createdAt!: Date;

  public [OptionalProps]?: 'invoiceId' | 'createdAt';

  public [PrimaryKeyProp]?: ['invoiceId'];
}

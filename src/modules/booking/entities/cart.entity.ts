import {
  BaseEntity,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  OptionalProps,
  PrimaryKey,
  PrimaryKeyProp,
  Property,
  Ref,
  Unique,
} from '@mikro-orm/core';

import { Nullable } from 'shared/types';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';
import { UserEntity } from 'modules/users/entities';

@Entity({ tableName: 'carts' })
@Unique({ properties: ['cartId', 'active'] })
export class CartEntity extends BaseEntity {
  @PrimaryKey({ name: 'id' })
  public cartId!: number;

  @Property({ name: 'total', columnType: 'int4', default: 0 })
  public total!: number; // total price of all products in the cart (in cents)

  @ManyToMany({
    entity: () => ProductEntity,
    joinColumn: 'cart_id',
    inverseJoinColumn: 'product_id',
    owner: true,
    pivotTable: 'cart_products',
  })
  public products!: Collection<ProductEntity>;

  @ManyToOne({ name: 'user_id', entity: () => UserEntity, ref: true })
  public user!: Ref<UserEntity>;

  @Property({ name: 'active', columnType: 'bool', default: true })
  public active!: boolean;

  @OneToOne({ name: 'order_id', entity: () => OrderEntity, mappedBy: 'cart', nullable: true, ref: true })
  public order!: Nullable<Ref<OrderEntity>>;

  @Property({ name: 'created_at', columnType: 'timestamp', defaultRaw: 'current_timestamp' })
  public createdAt!: Date;

  @Property({
    name: 'modified_at',
    columnType: 'timestamp',
    defaultRaw: 'current_timestamp',
    onUpdate: () => new Date(),
  })
  public modifiedAt!: Date;

  public [OptionalProps]?: 'cartId' | 'active' | 'createdAt' | 'modifiedAt';

  public [PrimaryKeyProp]?: ['cartId'];
}

import { Injectable, Logger } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { OrderEntity } from '../entities';

@Injectable()
export class OrdersRepository {
  private readonly logger = new Logger(OrdersRepository.name);

  public constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {}

  public async insertOrder(cartId: number): Promise<OrderEntity> {
    this.logger.log(`Inserting order for cart ${cartId}`);

    const order = this.orm.em.create(OrderEntity, { cart: { cartId } });
    await this.orm.em.persistAndFlush(order);

    return order;
  }
}

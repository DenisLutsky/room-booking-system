import { Injectable, Logger } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { InvoiceStatus } from '../enums';
import { InvoiceEntity } from '../entities';
import { OrderStatus } from 'modules/booking/enums';
import { OrderEntity } from 'modules/booking/entities';
import { TimeSlotStatus } from 'modules/rooms/enums';

@Injectable()
export class InvoicesRepository {
  private readonly logger = new Logger(InvoicesRepository.name);

  public constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {}

  public async insertInvoice(order: OrderEntity, paymentIntentId: string): Promise<InvoiceEntity> {
    this.logger.log(`Inserting invoice for order ${order.orderId}`);

    return await this.orm.em.transactional(async (em) => {
      const invoice = em.create(InvoiceEntity, { order, token: paymentIntentId });
      order.status = OrderStatus.COMPLETED;

      await em.persistAndFlush([invoice, order]);

      return invoice;
    });
  }

  public async selectOneInvoice(input: { token: string }): Promise<InvoiceEntity> {
    this.logger.log(`Selecting one invoice with filter`);

    return await this.orm.em.findOne(InvoiceEntity, input);
  }

  public async updateInvoice(invoice: InvoiceEntity, input: { status: InvoiceStatus }): Promise<void> {
    this.logger.log(`Updating invoice status`);

    await this.orm.em.transactional(async (em) => {
      if (input.status) invoice.status = input.status;

      em.persist(invoice);

      if (invoice.status === InvoiceStatus.PAID) {
        const order = await invoice.order.load({ populate: ['cart', 'cart.products', 'cart.products.timeSlot'] });
        const cart = order.cart.unwrap();
        const cartItems = cart.products.getItems();

        for (const item of cartItems) {
          const timeSlot = item.timeSlot.unwrap();
          timeSlot.status = TimeSlotStatus.BOOKED;

          em.persist(timeSlot);
        }

        cart.active = false;

        em.persist(cart);
      }

      await em.flush();
    });
  }
}

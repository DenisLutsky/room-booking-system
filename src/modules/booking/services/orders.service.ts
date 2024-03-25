import { Injectable, Logger } from '@nestjs/common';

import { OrderEntity } from '../entities';
import { OrdersRepository } from '../repositories';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  public constructor(private readonly ordersRepository: OrdersRepository) {}

  public async createOrder(cartId: number): Promise<OrderEntity> {
    this.logger.log(`Creating order for cart ${cartId}`);

    return await this.ordersRepository.insertOrder(cartId);
  }
}

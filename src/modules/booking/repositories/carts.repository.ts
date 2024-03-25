import { Injectable, Logger } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { CartEntity, ProductEntity } from '../entities';
import { CartInput } from '../interfaces';
import { TimeSlotStatus } from 'modules/rooms/enums';
import { UserEntity } from 'modules/users/entities';

@Injectable()
export class CartsRepository {
  private readonly logger = new Logger(CartsRepository.name);

  public constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {}

  public async selectActiveCartByUserId(userId: number): Promise<CartEntity> {
    this.logger.log(`Selecting active cart for user ${userId}`);

    return await this.orm.em.findOne(CartEntity, { user: { userId }, active: true });
  }

  public async insertCart(userId: number): Promise<CartEntity> {
    this.logger.log(`Inserting cart for user ${userId}`);

    return await this.orm.em.transactional(async (em) => {
      const user = em.getReference(UserEntity.name, { userId });
      const cart = em.create(CartEntity, { user });

      await em.persistAndFlush(cart);

      return cart;
    });
  }

  public async updateCart(cart: CartEntity, input: CartInput): Promise<void> {
    this.logger.log(`Updating cart ${cart.cartId}`);

    if (input.active !== undefined) cart.active = input.active;

    await this.orm.em.persistAndFlush(cart);
  }

  public async addProductToCart(cart: CartEntity, product: ProductEntity): Promise<void> {
    this.logger.log(`Adding product ${product.productId} to cart ${cart.cartId}`);

    await this.orm.em.transactional(async (em) => {
      cart.products.add(product);
      cart.total += product.price;

      const timeSlot = product.timeSlot.unwrap();
      timeSlot.status = TimeSlotStatus.RESERVED;
      timeSlot.reservedAt = new Date();

      await em.persistAndFlush([cart, product]);
    });
  }

  public async removeProductFromCart(cart: CartEntity, product: ProductEntity): Promise<void> {
    this.logger.log(`Removing product ${product.productId} from cart ${cart.cartId}`);

    await this.orm.em.transactional(async (em) => {
      cart.products.remove(product);

      const newTotal = cart.total - product.price;
      cart.total = newTotal >= 0 ? newTotal : 0;

      const timeSlot = await product.timeSlot.load();
      timeSlot.status = TimeSlotStatus.AVAILABLE;
      timeSlot.reservedAt = null;

      await em.persistAndFlush([cart, product]);
    });
  }
}

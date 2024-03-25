import { Injectable, Logger } from '@nestjs/common';

import { CartEntity } from '../entities';
import { ProductsService } from './products.service';
import { CartsRepository } from '../repositories';

@Injectable()
export class CartsService {
  private readonly logger = new Logger(CartsService.name);

  public constructor(
    private readonly productsService: ProductsService,
    private readonly cartsRepository: CartsRepository,
  ) {}

  public async getActiveCartByUserId(userId: number): Promise<CartEntity> {
    this.logger.log(`Getting active cart for user ${userId}`);

    let cart = await this.cartsRepository.selectActiveCartByUserId(userId);
    if (!cart) cart = await this.cartsRepository.insertCart(userId);

    await cart.populate(['products']);

    return cart;
  }

  public async addProductToCart(userId: number, productId: number): Promise<void> {
    this.logger.log(`Adding product ${productId} to cart for user ${userId}`);

    const cart = await this.getActiveCartByUserId(userId);
    const product = await this.productsService.selectProductById(productId);

    await this.cartsRepository.addProductToCart(cart, product);
  }

  public async removeProductFromCart(userId: number, productId: number): Promise<void> {
    this.logger.log(`Removing product ${productId} from cart for user ${userId}`);

    const cart = await this.getActiveCartByUserId(userId);
    const product = await this.productsService.selectProductById(productId);

    await this.cartsRepository.removeProductFromCart(cart, product);
  }
}

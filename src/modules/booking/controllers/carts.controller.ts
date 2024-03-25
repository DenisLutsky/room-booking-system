import { Controller, Get, ParseIntPipe, Put, Delete, Query } from '@nestjs/common';

import { User } from 'shared/decorators';
import { CartEntity } from '../entities';
import { CartsService } from '../services';

@Controller('cart')
export class CartsController {
  public constructor(private readonly cartsService: CartsService) {}

  @Get()
  private async getCart(@User('userId') userId: number): Promise<CartEntity> {
    return await this.cartsService.getActiveCartByUserId(userId);
  }

  @Put('add-product')
  private async addProduct(
    @User('userId') userId: number,
    @Query('productId', ParseIntPipe) productId: number,
  ): Promise<void> {
    await this.cartsService.addProductToCart(userId, productId);
  }

  @Delete('remove-product')
  private async removeProduct(
    @User('userId') userId: number,
    @Query('productId', ParseIntPipe) productId: number,
  ): Promise<void> {
    await this.cartsService.removeProductFromCart(userId, productId);
  }
}

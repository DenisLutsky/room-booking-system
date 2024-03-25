import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ProductEntity } from '../entities';
import { ProductsRepository } from '../repositories';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  public constructor(private readonly productsRepository: ProductsRepository) {}

  public async selectProductById(productId: number): Promise<ProductEntity> {
    this.logger.log(`Selecting product ${productId}`);

    const product = await this.productsRepository.selectOneProduct({ productId });

    if (!product) throw new NotFoundException(`Product ${productId} not found`);

    return product;
  }
}

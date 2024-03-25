import { Injectable, Logger } from '@nestjs/common';
import { FilterQuery, MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { ProductInput } from '../interfaces';
import { ProductEntity } from '../entities';

@Injectable()
export class ProductsRepository {
  private readonly logger = new Logger(ProductsRepository.name);

  public constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {}

  public async selectOneProduct(input: Partial<ProductInput>): Promise<ProductEntity> {
    this.logger.log(`Selecting one product record with filter`);

    const filter: FilterQuery<ProductEntity> = {};

    if (input.productId) filter.productId = input.productId;

    return await this.orm.em.findOne(ProductEntity, filter);
  }
}

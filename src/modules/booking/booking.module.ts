import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { CartEntity, InvoiceEntity, OrderEntity, ProductEntity } from './entities';
import { BookingController, CartsController } from './controllers';
import { BookingService, CartsService, ProductsService } from './services';
import { CartsRepository, ProductsRepository } from './repositories';

@Module({
  imports: [MikroOrmModule.forFeature([CartEntity, ProductEntity, InvoiceEntity, OrderEntity])],
  controllers: [BookingController, CartsController],
  providers: [BookingService, CartsService, CartsRepository, ProductsService, ProductsRepository],
})
export class BookingModule {}

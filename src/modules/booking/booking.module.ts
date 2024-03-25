import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { CartEntity, OrderEntity, ProductEntity } from './entities';
import { BookingController, CartsController } from './controllers';
import { BookingService, CartsService, OrdersService, ProductsService } from './services';
import { CartsRepository, OrdersRepository, ProductsRepository } from './repositories';
import { PaymentModule } from 'modules/payment/payment.module';

@Module({
  imports: [MikroOrmModule.forFeature([CartEntity, ProductEntity, OrderEntity]), PaymentModule],
  controllers: [BookingController, CartsController],
  providers: [
    BookingService,
    CartsService,
    CartsRepository,
    ProductsService,
    ProductsRepository,
    OrdersService,
    OrdersRepository,
  ],
})
export class BookingModule {}

import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { InvoiceEntity } from './entities';
import { PaymentController } from './controllers';
import { PaymentService } from './services';
import { InvoicesRepository } from './repository';

@Module({
  imports: [MikroOrmModule.forFeature([InvoiceEntity])],
  controllers: [PaymentController],
  providers: [PaymentService, InvoicesRepository],
  exports: [PaymentService],
})
export class PaymentModule {}

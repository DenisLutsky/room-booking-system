import { Module } from '@nestjs/common';

import { BookingController } from './controllers';
import { BookingService } from './services';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}

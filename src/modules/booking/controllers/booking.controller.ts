import { Body, Controller, Get, Post } from '@nestjs/common';

import { User } from 'shared/decorators';
import { CompleteBookingDto } from '../dto';
import { BookingService } from '../services';
import { InvoiceEntity } from 'modules/payment/entities';

@Controller('booking')
export class BookingController {
  public constructor(private readonly bookingService: BookingService) {}

  @Get('/initiate')
  private async initiateBooking(@User('userId') userId: number): Promise<InvoiceEntity> {
    return await this.bookingService.initiateBooking(userId);
  }

  @Post('/complete')
  private async completeBooking(@User('userId') userId: number, @Body() input: CompleteBookingDto): Promise<void> {
    return await this.bookingService.completeBooking(userId, input);
  }
}

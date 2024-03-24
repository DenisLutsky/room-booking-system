import { Controller } from '@nestjs/common';

import { BookingService } from '../services';

@Controller('booking')
export class BookingController {
  public constructor(private readonly bookingService: BookingService) {}
}

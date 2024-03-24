import { Body, Controller, Get } from '@nestjs/common';

import { GetTimeSlotsDto } from '../dto';
import { TimeSlotEntity } from '../entities';
import { CalendarsService } from '../services';

@Controller('time-slots')
export class TimeSlotsController {
  public constructor(private readonly calendarsService: CalendarsService) {}

  @Get()
  private async getTimeSlots(@Body() input: GetTimeSlotsDto): Promise<TimeSlotEntity[]> {
    return await this.calendarsService.getTimeSlots(input);
  }
}

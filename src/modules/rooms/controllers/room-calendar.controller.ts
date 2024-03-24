import { Controller, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';

import { CreateTimeSlotDto } from '../dto';
import { TimeSlotEntity } from '../entities';
import { CalendarsService } from '../services';
import { SuperAdminGuard } from 'modules/authorization/guards';

@Controller('rooms/:roomId/calendar')
@UseGuards(SuperAdminGuard)
export class RoomCalendarController {
  public constructor(private readonly calendarsService: CalendarsService) {}

  @Post()
  private async createTimeSlot(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() input: CreateTimeSlotDto,
  ): Promise<TimeSlotEntity> {
    return await this.calendarsService.createTimeSlot(roomId, input);
  }

  // TODO: add functionality to manage time slots
}

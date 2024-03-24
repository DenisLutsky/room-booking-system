import { Injectable, Logger } from '@nestjs/common';

import { GetTimeSlotsInput, TimeSlot } from '../interfaces';
import { TimeSlotEntity } from '../entities';
import { RoomsService } from './rooms.service';
import { CalendarsRepository } from '../repositories';

@Injectable()
export class CalendarsService {
  private readonly logger = new Logger(CalendarsService.name);

  public constructor(
    private readonly roomsService: RoomsService,
    private readonly calendarsRepository: CalendarsRepository,
  ) {}

  public async createTimeSlot(roomId: number, input: TimeSlot): Promise<TimeSlotEntity> {
    this.logger.log(`Creating a new room`);

    const room = await this.roomsService.getRoom(roomId);
    const calendar = await room.calendar.load();

    if (!calendar) throw new Error(`Calendar for room ${roomId} not found`);

    return await this.calendarsRepository.insertTimeSlot(calendar, input);
  }

  public async getTimeSlots(input: Partial<GetTimeSlotsInput>): Promise<TimeSlotEntity[]> {
    this.logger.log(`Getting list of time slots`);

    return await this.calendarsRepository.getTimeSlots(input);
  }
}

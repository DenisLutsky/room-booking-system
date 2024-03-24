import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { TimeSlotEntity, CalendarEntity, RoomEntity } from './entities';
import { RoomCalendarController, RoomsController, TimeSlotsController } from './controllers';
import { CalendarsService, RoomsService } from './services';
import { CalendarsRepository, RoomsRepository } from './repositories';

@Module({
  imports: [MikroOrmModule.forFeature([RoomEntity, CalendarEntity, TimeSlotEntity])],
  controllers: [RoomsController, RoomCalendarController, TimeSlotsController],
  providers: [RoomsService, RoomsRepository, CalendarsService, CalendarsRepository],
})
export class RoomsModule {}

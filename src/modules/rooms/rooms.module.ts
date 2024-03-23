import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { TimeSlotEntity, CalendarEntity, RoomEntity } from './entities';
import { RoomsController } from './controllers';
import { RoomsService } from './services';
import { RoomsRepository } from './repositories';

@Module({
  imports: [MikroOrmModule.forFeature([RoomEntity, CalendarEntity, TimeSlotEntity])],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository],
})
export class RoomsModule {}

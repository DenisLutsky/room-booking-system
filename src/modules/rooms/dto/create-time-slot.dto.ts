import { IsNotEmpty } from 'class-validator';

import { IsDateValid, IsFutureDate, IsTimeBefore, IsTimeValid, Trim } from 'shared/decorators';
import { TimeSlot } from '../interfaces';

export class CreateTimeSlotDto implements TimeSlot {
  @IsFutureDate()
  @IsDateValid()
  @IsNotEmpty()
  @Trim()
  public readonly date!: string;

  @IsTimeBefore('endTime')
  @IsTimeValid()
  @IsNotEmpty()
  @Trim()
  public readonly startTime!: string;

  @IsTimeValid()
  @IsNotEmpty()
  @Trim()
  public readonly endTime!: string;
}

import { IsNotEmpty, ValidateNested } from 'class-validator';

import { IsDateValid, IsFutureDate, IsTimeBefore, IsTimeValid, Trim } from 'shared/decorators';
import { TimeSlot } from '../interfaces';
import { Type } from 'class-transformer';
import { CreateProductDto } from 'modules/booking/dto';

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

  @ValidateNested()
  @Type(() => CreateProductDto)
  public readonly product: CreateProductDto;
}

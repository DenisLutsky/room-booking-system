import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min, Validate } from 'class-validator';

import { AtLeastOneField, IsDateBefore, IsDateValid, IsTimeBefore, IsTimeValid, Trim } from 'shared/decorators';
import { RoomType } from '../enums';
import { GetTimeSlotsInput } from '../interfaces';

export class GetTimeSlotsDto implements GetTimeSlotsInput {
  @Min(1)
  @IsInt()
  @IsOptional()
  public readonly roomId!: number;

  @IsEnum(RoomType)
  @IsOptional()
  public readonly roomType!: RoomType;

  @IsDateBefore('dateTo')
  @IsDateValid()
  @IsNotEmpty()
  @Trim()
  @IsOptional()
  public readonly dateFrom!: string;

  @IsDateValid()
  @IsNotEmpty()
  @Trim()
  @IsOptional()
  public readonly dateTo!: string;

  @IsTimeBefore('timeTo')
  @IsTimeValid()
  @IsNotEmpty()
  @Trim()
  @IsOptional()
  public readonly timeFrom!: string;

  @IsTimeValid()
  @IsNotEmpty()
  @Trim()
  @IsOptional()
  public readonly timeTo!: string;

  @Validate(AtLeastOneField, ['roomId', 'roomType', 'dateFrom', 'dateTo', 'timeFrom', 'timeTo'] as Array<
    keyof GetTimeSlotsInput
  >)
  private readonly constraint?: boolean;
}

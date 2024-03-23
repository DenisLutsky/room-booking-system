import { IsEnum, IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

import { Trim } from 'shared/decorators';
import { Room } from '../interfaces';
import { RoomType } from '../enums';

export class CreateRoomDto implements Room {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @Trim()
  public readonly name!: string;

  @IsEnum(RoomType)
  public readonly type!: RoomType;

  @Min(1)
  @IsInt()
  public readonly area!: number;

  @Min(1)
  @IsInt()
  public readonly capacity!: number;
}

import { RoomType } from '../enums';

export interface Room {
  name: string;
  type: RoomType;
  area: number;
  capacity: number;
}

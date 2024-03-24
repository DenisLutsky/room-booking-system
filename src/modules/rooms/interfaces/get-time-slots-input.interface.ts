import { RoomType } from '../enums';

export interface GetTimeSlotsInput {
  roomId: number;
  roomType: RoomType;
  dateFrom: string;
  dateTo: string;
  timeFrom: string;
  timeTo: string;
}

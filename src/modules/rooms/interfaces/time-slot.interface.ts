import { ProductInput } from 'modules/booking/interfaces';

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  product: Partial<ProductInput>;
}

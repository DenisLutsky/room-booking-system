import { CreditCard } from 'modules/payment/interfaces';

export interface CompleteBookingInput {
  token: string;
  creditCard: CreditCard;
}

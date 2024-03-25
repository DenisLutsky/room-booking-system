import { IsCreditCard, IsNotEmpty } from 'class-validator';

import { IsCVV, IsDateValid, IsFutureDate, Trim } from 'shared/decorators';
import { CreditCard } from 'modules/payment/interfaces';

export class CreditCardDto implements CreditCard {
  @IsCreditCard()
  public readonly number!: string;

  @IsFutureDate()
  @IsDateValid()
  @IsNotEmpty()
  @Trim()
  public readonly expirationDate!: string;

  @IsCVV()
  @IsNotEmpty()
  @Trim()
  public readonly cvv!: string;
}

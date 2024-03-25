import { IsDefined, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';

import { Trim } from 'shared/decorators';
import { CompleteBookingInput } from '../interfaces';
import { CreditCardDto } from './credit-card.dto';
import { Type } from 'class-transformer';

export class CompleteBookingDto implements CompleteBookingInput {
  @IsUUID()
  @IsNotEmpty()
  @Trim()
  public readonly token!: string;

  @ValidateNested()
  @Type(() => CreditCardDto)
  @IsDefined()
  public readonly creditCard: CreditCardDto;
}

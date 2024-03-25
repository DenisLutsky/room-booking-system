import { Controller } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Controller('payment')
export class PaymentController {
  public constructor(private readonly paymentService: PaymentService) {}
}

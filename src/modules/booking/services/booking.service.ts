import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { CompleteBookingInput } from '../interfaces';
import { CartsService } from './carts.service';
import { OrdersService } from './orders.service';
import { InvoiceEntity } from 'modules/payment/entities';
import { PaymentService } from 'modules/payment/services';
import { InvoiceStatus } from 'modules/payment/enums';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  public constructor(
    private readonly cartsService: CartsService,
    private readonly ordersService: OrdersService,
    private readonly paymentService: PaymentService,
  ) {}

  public async initiateBooking(userId: number): Promise<InvoiceEntity> {
    this.logger.log(`Initiating booking for userId: ${userId}`);

    const cart = await this.cartsService.getActiveCartByUserId(userId);
    if (!cart.products.length) throw new BadRequestException('Cart is empty');

    const order = await this.ordersService.createOrder(cart.cartId);
    const invoice = await this.paymentService.createInvoice(order);

    return invoice;
  }

  public async completeBooking(userId: number, input: CompleteBookingInput): Promise<void> {
    this.logger.log(`Completing booking for user ${userId}`);

    const invoice = await this.paymentService.getInvoiceByPaymentIntentId(input.token);
    if (!invoice || invoice.status !== InvoiceStatus.PENDING) throw new BadRequestException('Invalid payment intent');

    const response = this.paymentService.simulatePayment(input.creditCard);
    if (response !== 'Payment successful') {
      // TODO: update invoice status to FAILED

      throw new BadRequestException(response);
    }

    await this.paymentService.updateInvoiceStatus(invoice, InvoiceStatus.PAID);
  }
}

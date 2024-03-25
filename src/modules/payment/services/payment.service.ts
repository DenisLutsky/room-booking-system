import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { InvoiceStatus } from '../enums';
import { CreditCard } from '../interfaces';
import { InvoiceEntity } from '../entities';
import { InvoicesRepository } from '../repository';
import { OrderStatus } from 'modules/booking/enums';
import { OrderEntity } from 'modules/booking/entities';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  public constructor(private readonly invoicesRepository: InvoicesRepository) {}

  private async createPaymentIntent(): Promise<string> {
    this.logger.log(`Creating payment intent`);

    // TODO: implement real payment gateway integration

    return uuid();
  }

  public async createInvoice(order: OrderEntity): Promise<InvoiceEntity> {
    this.logger.log(`Creating invoice for order ${order.orderId}`);

    if (!order || order.status !== OrderStatus.PENDING) throw new Error('Invalid order');

    const paymentIntentId = await this.createPaymentIntent();
    const invoice = await this.invoicesRepository.insertInvoice(order, paymentIntentId);

    return invoice;
  }

  public async getInvoiceByPaymentIntentId(paymentIntentId: string): Promise<InvoiceEntity> {
    this.logger.log(`Getting invoice by payment intent ID ${paymentIntentId}`);

    return await this.invoicesRepository.selectOneInvoice({ token: paymentIntentId });
  }

  public async updateInvoiceStatus(invoice: InvoiceEntity, status: InvoiceStatus): Promise<void> {
    this.logger.log(`Updating invoice status to ${status}`);

    await this.invoicesRepository.updateInvoice(invoice, { status });
  }

  public simulatePayment(cardDetails: CreditCard): string {
    const VALID_CARD_NUMBER = '4242424242424242';
    const INVALID_CARD_NUMBER = '4000000000000002';

    if (!this.isValidCVV(cardDetails.cvv)) {
      return 'Payment declined: Invalid CVV';
    }

    if (!this.isDateValid(cardDetails.expirationDate)) {
      return 'Payment declined: Card expired';
    }

    if (cardDetails.number === VALID_CARD_NUMBER) {
      return 'Payment successful';
    } else if (cardDetails.number === INVALID_CARD_NUMBER) {
      return 'Payment declined: Invalid card';
    } else {
      return 'Payment declined: Unknown card';
    }
  }

  private isValidCVV(cvv: string): boolean {
    return /^[0-9]{3,4}$/.test(cvv);
  }

  private isDateValid(expirationDate: string): boolean {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const [expMonth, expYear] = expirationDate.split('/').map(Number);

    if (expYear < currentYear) {
      return false;
    } else if (expYear === currentYear && expMonth < currentMonth) {
      return false;
    }
    return true;
  }
}

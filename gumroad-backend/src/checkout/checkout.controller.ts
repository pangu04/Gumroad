import { Controller, Post, Body, Param } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('api/checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('create-session')
  async createCheckoutSession(@Body() body: { productId: string }) {
    return this.checkoutService.createSession(body.productId);
  }
}

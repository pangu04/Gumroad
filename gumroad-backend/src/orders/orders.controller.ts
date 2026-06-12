import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('confirm')
  async confirmOrder(@Request() req: any, @Body() body: { productId: string }) {
    return this.ordersService.createOrder(req.user.userId, body.productId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-purchases')
  async myPurchases(@Request() req: any) {
    return this.ordersService.getMyPurchases(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-revenue')
  async myRevenue(@Request() req: any) {
    return this.ordersService.getMyRevenueReport(req.user.userId);
  }
}

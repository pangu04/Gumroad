import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CheckoutModule } from './checkout/checkout.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [CloudinaryModule, PrismaModule, ProductsModule, AuthModule, CheckoutModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

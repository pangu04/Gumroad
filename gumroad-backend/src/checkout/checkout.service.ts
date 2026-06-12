import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CheckoutService {
  private stripe: any;

  constructor(private prisma: PrismaService) {
    // Use a dummy key if env is not set, to allow the app to compile and run
    const secretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_51MockKeyDoNotUseInProd1234567890';
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2026-05-27.dahlia' as any,
    });
  }

  async createSession(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

    // If using dummy key, return a mock success URL directly to bypass Stripe auth error
    if (process.env.STRIPE_SECRET_KEY === undefined || process.env.STRIPE_SECRET_KEY === 'sk_test_51MockKeyDoNotUseInProd1234567890') {
      return { url: `${frontendUrl}/success?session_id=mock_session_123&product_id=${product.id}` };
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              description: product.description || 'Gumroad Product',
              images: product.thumbnail ? [product.thumbnail] : [],
            },
            unit_amount: Math.round(product.price.toNumber() * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}&product_id=${product.id}`,
      cancel_url: `${frontendUrl}/product/${product.id}`,
      metadata: {
        productId: product.id,
      },
    });

    return { url: session.url };
  }
}

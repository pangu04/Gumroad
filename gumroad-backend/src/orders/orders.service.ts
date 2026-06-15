import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string, productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    // Check if user already bought this product
    const alreadyBought = await this.prisma.orderItem.findFirst({
      where: {
        productId,
        order: { customerId: userId }
      }
    });
    if (alreadyBought) return { success: true, message: 'Already purchased' };

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        customerId: userId,
        totalAmount: product.price,
        status: 'COMPLETED',
        items: {
          create: {
            productId: product.id,
            sellerId: product.creatorId,
            price: product.price,
          }
        }
      }
    });

    // Increment sales count
    await this.prisma.product.update({
      where: { id: product.id },
      data: { salesCount: { increment: 1 } }
    });

    return { success: true, order };
  }

  async getMyPurchases(userId: string) {
    const items = await this.prisma.orderItem.findMany({
      where: { order: { customerId: userId } },
      include: {
        product: {
          select: { id: true, title: true, slug: true, thumbnail: true, fileUrl: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return items.map(item => item.product);
  }

  async getMyRevenueReport(sellerId: string, year?: number) {
    const targetYear = year || new Date().getFullYear();

    const items = await this.prisma.orderItem.findMany({
      where: {
        sellerId,
        createdAt: {
          gte: new Date(`${targetYear}-01-01T00:00:00.000Z`),
          lte: new Date(`${targetYear}-12-31T23:59:59.999Z`),
        }
      },
      select: { price: true, createdAt: true }
    });

    // Also get all-time items to calculate total-all-time if needed, but we can just return total for the year
    let totalRevenue = 0;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData: Record<string, number> = {};

    items.forEach(item => {
      const p = Number(item.price);
      totalRevenue += p;
      const d = new Date(item.createdAt);
      const key = months[d.getMonth()];
      monthlyData[key] = (monthlyData[key] || 0) + p;
    });

    // Take out 10% platform fee
    const netRevenue = totalRevenue * 0.9;

    const chartData = months.map(m => ({
      name: m,
      revenue: Math.round((monthlyData[m] || 0) * 0.9)
    }));

    return {
      year: targetYear,
      totalRevenue: Math.round(netRevenue),
      totalSales: items.length,
      chartData,
    };
  }
}

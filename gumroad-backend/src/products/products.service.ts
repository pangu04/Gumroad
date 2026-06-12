import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

const productInclude = {
  creator: {
    select: {
      id: true,
      name: true,
      avatar: true,
      creatorProfile: { select: { handle: true } },
    },
  },
  category: { select: { id: true, name: true, icon: true, color: true } },
};

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(categoryId?: string) {
    return this.prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        ...(categoryId ? { categoryId } : {}),
      },
      include: productInclude,
      orderBy: { salesCount: 'desc' },
    });
  }

  async findByCreator(creatorId: string) {
    return this.prisma.product.findMany({
      where: { creatorId },
      include: productInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPublicByCreator(creatorId: string) {
    return this.prisma.product.findMany({
      where: { creatorId, status: 'ACTIVE' },
      include: productInclude,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        ...productInclude,
        reviews: {
          include: { user: { select: { name: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!product) throw new NotFoundException('Product not found');

    // remove fileUrl for public viewing
    const { fileUrl, ...publicProduct } = product;

    // increment view count
    await this.prisma.product.update({
      where: { id: product.id },
      data: { viewCount: { increment: 1 } },
    });

    return publicProduct;
  }

  async create(creatorId: string, dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        creatorId,
        categoryId: dto.categoryId,
        price: dto.price,
        originalPrice: dto.originalPrice,
        description: dto.description || '',
        longDescription: dto.longDescription || '',
        thumbnail: dto.thumbnail || '',
        fileUrl: dto.fileUrl || '',
        tags: dto.tags || [],
        status: 'ACTIVE',
        publishedAt: new Date(),
      },
      include: productInclude,
    });
  }

  async update(id: string, creatorId: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findFirst({
      where: { id, creatorId },
    });
    if (!product) throw new NotFoundException('Product not found or unauthorized');

    return this.prisma.product.update({
      where: { id },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.price !== undefined && { price: dto.price }),
        ...(dto.originalPrice !== undefined && { originalPrice: dto.originalPrice }),
        ...(dto.description && { description: dto.description }),
        ...(dto.longDescription && { longDescription: dto.longDescription }),
        ...(dto.thumbnail && { thumbnail: dto.thumbnail }),
        ...(dto.fileUrl && { fileUrl: dto.fileUrl }),
        ...(dto.tags && { tags: dto.tags }),
        ...(dto.status && { status: dto.status as any }),
      },
      include: productInclude,
    });
  }

  async remove(id: string, creatorId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, creatorId },
    });
    if (!product) throw new NotFoundException('Product not found or unauthorized');

    await this.prisma.product.delete({ where: { id } });
    return { message: 'Product deleted successfully' };
  }

  async getCategories() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }
}

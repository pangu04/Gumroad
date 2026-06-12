import {
  Controller, Get, Post, Put, Delete, Param, Body,
  UseGuards, Request, UseInterceptors, UploadedFile, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('api/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // ─── Public routes ───────────────────────────────────────────────────────────

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('categories')
  async getCategories() {
    return this.productsService.getCategories();
  }

  @Get('creator/:creatorId')
  async findByCreator(@Param('creatorId') creatorId: string) {
    return this.productsService.findPublicByCreator(creatorId);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.productsService.findOne(slug);
  }

  // ─── Protected routes (require JWT) ──────────────────────────────────────────

  @UseGuards(JwtAuthGuard)
  @Post('upload-thumbnail')
  @UseInterceptors(FileInterceptor('file'))
  async uploadThumbnail(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');
    const url = await this.cloudinaryService.uploadImage(file, 'gumroad_products');
    return { url };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req: any, @Body() dto: CreateProductDto) {
    return this.productsService.create(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Request() req: any, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    return this.productsService.remove(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my/products')
  async myProducts(@Request() req: any) {
    return this.productsService.findByCreator(req.user.userId);
  }
}

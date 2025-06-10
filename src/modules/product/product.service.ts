import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { PrismaService } from '@database/PrismaService';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(product: CreateProductDto) {
    return this.prisma.product.create({
      data: product,
    });
  }

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: number) {
    var entity = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!entity) throw new Error(`Product not found`);
    return entity;
  }

  async deleteProduct(id: number) {
    const entity = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!entity) throw new Error(`Product not found`);

    return this.prisma.product.delete({
      where: { id: entity.id },
    });
  }
  async updateProduct(product: UpdateProductDto) {
    const entity = await this.prisma.product.findUnique({
      where: { id: product.id },
    });

    if (!entity) throw new Error(`Product not found`);

    return this.prisma.product.update({
      where: { id: entity.id },
      data: product,
    });
  }
}

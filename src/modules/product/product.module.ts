import { Module } from '@nestjs/common';

import { PrismaService } from '@database/PrismaService';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [PrismaService, ProductService],
})
export class ProductModule {}

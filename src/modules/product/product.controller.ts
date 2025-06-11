import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateAdminDto } from '../admin/admin-settings/dto/update-admin.dto';
import { UpdateProductDto } from './dto/update-product-dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@ApiTags('Produtos')
@Controller('product')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Rota que lista todos os produtos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async getAllProducts() {
    return this._productService.getAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Rota que recupera um produto pelo ID.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return this._productService.getProductById(id);
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiOperation({ security: [{ bearerAuth: [] }], summary: 'Rota para criar um produto.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async createProduct(@Body() payload: CreateProductDto) {
    return this._productService.createProduct(payload);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ security: [{ bearerAuth: [] }], summary: 'Rota para deletar um produto.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this._productService.deleteProduct(id);
  }

  @Put()
  @ApiOperation({ security: [{ bearerAuth: [] }], summary: 'Rota para atualizar um produto.' })
  @ApiBody({ type: UpdateProductDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async updateProduct(@Body() product: UpdateProductDto) {
    return this._productService.updateProduct(product);
  }
}

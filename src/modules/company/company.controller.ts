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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company-dto';
import { UpdateAdminDto } from '../admin/admin-settings/dto/update-admin.dto';
import { UpdateCompanyDto } from './dto/update-company-dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import handleAccessControl from '@utils/HandleAccessControl';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { IsPublic } from '../auth/decorators/is-public.decorator';
@ApiTags('Empresas')
@Controller('company')
export class CompanyController {
  constructor(private readonly _companyService: CompanyService) {}

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Rota que lista todas as empresas.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async getAllCompanies() {
    return this._companyService.getAllCompanies();
  }

  @IsPublic()
  @Get(':id')
  @ApiOperation({ summary: 'Rota que recupera uma empresa pelo ID.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async getCompanyById(@Param('id', ParseIntPipe) id: number) {
    return this._companyService.getCompanyById(id);
  }

  @Post()
  @ApiBody({ type: CreateCompanyDto })
  @ApiOperation({ security: [{ bearerAuth: [] }], summary: 'Rota para criar uma empresa.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  async createCompany(@CurrentUser() user: User, @Body() payload: CreateCompanyDto) {
    return this._companyService.createCompany(payload.name, user.id);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ security: [{ bearerAuth: [] }], summary: 'Rota para deletar uma empresa.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  async deleteCompany(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    handleAccessControl.verifyOwnerRole(user, id);
    return this._companyService.deleteCompany(id);
  }

  @Put()
  @ApiBody({ type: UpdateCompanyDto })
  @ApiOperation({ security: [{ bearerAuth: [] }], summary: 'Rota para atualizar uma empresa.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  async updateCompany(@CurrentUser() user: User, @Body() company: UpdateCompanyDto) {
    handleAccessControl.verifyOwnerRole(user, company.id);
    return this._companyService.updateCompany({
      id: company.id,
      name: company.name,
      userId: company.userId,
    });
  }
}

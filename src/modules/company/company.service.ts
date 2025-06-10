import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateCompanyDto } from './dto/update-company-dto';
import { PrismaService } from '@database/PrismaService';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async createCompany(name: string, userId: number) {
    return this.prisma.company.create({
      data: { name, userId },
    });
  }

  async getAllCompanies() {
    return this.prisma.company.findMany();
  }

  async getCompanyById(id: number) {
    const entity = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!entity) throw new Error(`Company not found`);
    return entity;
  }

  async deleteCompany(id: number) {
    const entity = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!entity) throw new Error(`Company not found`);

    return this.prisma.company.delete({
      where: { id: entity.id },
    });
  }
  async updateCompany(company: UpdateCompanyDto) {
    const entity = await this.prisma.company.findUnique({
      where: { id: company.id },
    });

    if (!entity) throw new Error(`Company not found`);

    return this.prisma.company.update({
      where: { id: entity.id },
      data: company,
    });
  }
}

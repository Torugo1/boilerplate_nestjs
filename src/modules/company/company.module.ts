import { Module } from '@nestjs/common';

import { PrismaService } from '@database/PrismaService';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
  providers: [PrismaService, CompanyService],
  imports: [],
})
export class CompanyModule {}

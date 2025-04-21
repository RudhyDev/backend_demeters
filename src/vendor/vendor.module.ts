import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/database/prisma.module';
import { VendorController } from './presentation/controllers/vendor.controller';
import { PrismaVendorRepository } from './infrastructure/repositories/prisma-vendor.repository';
import { RegisterVendorUseCase } from './application/use-cases/register-vendor.use-case';
import { UpdateVendorUseCase } from './application/use-cases/update-vendor.use-case';
import { FindVendorUseCase } from './application/use-cases/find-vendor.use-case';
import { DeleteVendorUseCase } from './application/use-cases/delete-vendor.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [VendorController],
  providers: [
    RegisterVendorUseCase,
    UpdateVendorUseCase,
    FindVendorUseCase,
    DeleteVendorUseCase,
    {
      provide: 'IVendorRepository',
      useClass: PrismaVendorRepository,
    },
  ],
  exports: ['IVendorRepository'],
})
export class VendorModule {}

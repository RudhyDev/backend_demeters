import { Module } from '@nestjs/common';
import { PrismaModule } from '../infra/database/prisma.module';
import { VendorController } from './presentation/controllers/vendor.controller';
import { CreateVendorUseCase } from './application/use-cases/create-vendor.use-case';
import { UpdateVendorUseCase } from './application/use-cases/update-vendor.use-case';
import { FindVendorByIdUseCase } from './application/use-cases/find-vendor-by-id.use-case';
import { FindAllVendorsUseCase } from './application/use-cases/find-all-vendors.use-case';
import { DeleteVendorUseCase } from './application/use-cases/delete-vendor.use-case';
import { PrismaVendorRepository } from './infrastructure/repositories/prisma-vendor.repository';
import { VENDOR_REPOSITORY } from './domain/interfaces/store-repository.interface';

@Module({
  imports: [PrismaModule],
  controllers: [VendorController],
  providers: [
    {
      provide: VENDOR_REPOSITORY,
      useClass: PrismaVendorRepository,
    },
    CreateVendorUseCase,
    UpdateVendorUseCase,
    FindVendorByIdUseCase,
    FindAllVendorsUseCase,
    DeleteVendorUseCase,
  ],
  exports: [VENDOR_REPOSITORY],
})
export class StoreModule {}

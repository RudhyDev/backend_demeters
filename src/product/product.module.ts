import { Module } from '@nestjs/common';
import { PrismaModule } from '../infra/database/prisma.module';
import { PRODUCT_REPOSITORY } from './domain/interfaces/product-repository.interface';
import { PrismaProductRepository } from './infrastructure/prisma-product.repository';
import { CreateProductUseCase } from './application/use-cases/create-product.use-case';
import { UpdateProductUseCase } from './application/use-cases/update-product.use-case';
import { FindProductByIdUseCase } from './application/use-cases/find-product-by-id.use-case';
import { FindAllProductsUseCase } from './application/use-cases/find-all-products.use-case';
import { DeleteProductUseCase } from './application/use-cases/delete-product.use-case';
import { ProductController } from './presentation/product.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useClass: PrismaProductRepository,
    },
    CreateProductUseCase,
    UpdateProductUseCase,
    FindProductByIdUseCase,
    FindAllProductsUseCase,
    DeleteProductUseCase,
  ],
  exports: [PRODUCT_REPOSITORY],
})
export class ProductModule {}

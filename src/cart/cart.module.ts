import { Module } from '@nestjs/common';
import { PrismaService } from '../infra/database/prisma.service';
import { AddItemToCartUseCase } from './application/use-cases/add-item-to-cart.use-case';
import { ClearCartUseCase } from './application/use-cases/clear-cart.use-case';
import { CreateCartUseCase } from './application/use-cases/create-cart.use-case';
import { FindCartByIdUseCase } from './application/use-cases/find-cart-by-id.use-case';
import { FindCartByUserIdUseCase } from './application/use-cases/find-cart-by-user-id.use-case';
import { RemoveItemFromCartUseCase } from './application/use-cases/remove-item-from-cart.use-case';
import { UpdateCartItemUseCase } from './application/use-cases/update-cart-item.use-case';
import { CART_REPOSITORY } from './domain/interfaces/cart-repository.token';
import { PrismaCartRepository } from './infrastructure/prisma-cart.repository';
import { CartController } from './presentation/cart.controller';

@Module({
  controllers: [CartController],
  providers: [
    PrismaService,
    {
      provide: CART_REPOSITORY,
      useClass: PrismaCartRepository,
    },
    CreateCartUseCase,
    FindCartByIdUseCase,
    FindCartByUserIdUseCase,
    AddItemToCartUseCase,
    UpdateCartItemUseCase,
    RemoveItemFromCartUseCase,
    ClearCartUseCase,
  ],
  exports: [
    CART_REPOSITORY,
    CreateCartUseCase,
    FindCartByIdUseCase,
    FindCartByUserIdUseCase,
  ],
})
export class CartModule {}

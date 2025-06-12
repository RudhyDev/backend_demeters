import { Inject, Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity';
import { CartRepository } from '../../domain/interfaces/cart-repository.interface';
import { CART_REPOSITORY } from '../../domain/interfaces/cart-repository.token';

@Injectable()
export class FindCartByUserIdUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(userId: string): Promise<Cart | null> {
    return this.cartRepository.findByUserId(userId);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity';
import { CartNotFoundException } from '../../domain/exceptions/cart-not-found.exception';
import { CartRepository } from '../../domain/interfaces/cart-repository.interface';
import { CART_REPOSITORY } from '../../domain/interfaces/cart-repository.token';

@Injectable()
export class FindCartByIdUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findById(id);

    if (!cart) {
      throw new CartNotFoundException(id);
    }

    return cart;
  }
}

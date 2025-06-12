import { Inject, Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity';
import { CartNotFoundException } from '../../domain/exceptions/cart-not-found.exception';
import { CartRepository } from '../../domain/interfaces/cart-repository.interface';
import { CART_REPOSITORY } from '../../domain/interfaces/cart-repository.token';

@Injectable()
export class ClearCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(cartId: string): Promise<Cart> {
    // Buscar o carrinho
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) {
      throw new CartNotFoundException(cartId);
    }

    // Limpar o carrinho
    cart.clearCart();
    cart.updatedAt = new Date();

    // Atualizar o carrinho no repositório
    return this.cartRepository.update(cart);
  }
}

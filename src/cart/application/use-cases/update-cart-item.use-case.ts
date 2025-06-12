import { Inject, Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity';
import { CartNotFoundException } from '../../domain/exceptions/cart-not-found.exception';
import { CartRepository } from '../../domain/interfaces/cart-repository.interface';
import { CART_REPOSITORY } from '../../domain/interfaces/cart-repository.token';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';

@Injectable()
export class UpdateCartItemUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(updateCartItemDto: UpdateCartItemDto): Promise<Cart> {
    const { cartId, productId, quantity } = updateCartItemDto;

    // Buscar o carrinho
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) {
      throw new CartNotFoundException(cartId);
    }

    // Atualizar a quantidade do item no carrinho
    cart.updateItemQuantity(productId, quantity);
    cart.updatedAt = new Date();

    // Atualizar o carrinho no repositório
    return this.cartRepository.update(cart);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity';
import { CartNotFoundException } from '../../domain/exceptions/cart-not-found.exception';
import { CartRepository } from '../../domain/interfaces/cart-repository.interface';
import { CART_REPOSITORY } from '../../domain/interfaces/cart-repository.token';
import { RemoveItemFromCartDto } from '../dtos/remove-item-from-cart.dto';

@Injectable()
export class RemoveItemFromCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(removeItemFromCartDto: RemoveItemFromCartDto): Promise<Cart> {
    const { cartId, productId } = removeItemFromCartDto;

    // Buscar o carrinho
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) {
      throw new CartNotFoundException(cartId);
    }

    // Remover o item do carrinho
    cart.removeItem(productId);
    cart.updatedAt = new Date();

    // Atualizar o carrinho no repositório
    return this.cartRepository.update(cart);
  }
}

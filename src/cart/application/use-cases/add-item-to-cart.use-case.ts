import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Cart } from '../../domain/entities/cart.entity';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { CartNotFoundException } from '../../domain/exceptions/cart-not-found.exception';
import { CartRepository } from '../../domain/interfaces/cart-repository.interface';
import { CART_REPOSITORY } from '../../domain/interfaces/cart-repository.token';
import { AddItemToCartDto } from '../dtos/add-item-to-cart.dto';

@Injectable()
export class AddItemToCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(addItemToCartDto: AddItemToCartDto): Promise<Cart> {
    const { cartId, productId, quantity } = addItemToCartDto;

    // Buscar o carrinho
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) {
      throw new CartNotFoundException(cartId);
    }

    // Criar um novo item para o carrinho
    const cartItem = new CartItem(
      randomUUID(),
      cartId,
      productId,
      quantity,
      0, // O preço será atualizado na camada de infraestrutura
    );

    // Adicionar o item ao carrinho
    cart.addItem(cartItem);
    cart.updatedAt = new Date();

    // Atualizar o carrinho no repositório
    return this.cartRepository.update(cart);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Cart } from '../../domain/entities/cart.entity';
import { CartRepository } from '../../domain/interfaces/cart-repository.interface';
import { CART_REPOSITORY } from '../../domain/interfaces/cart-repository.token';
import { CreateCartDto } from '../dtos/create-cart.dto';

@Injectable()
export class CreateCartUseCase {
  constructor(
    @Inject(CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(createCartDto: CreateCartDto): Promise<Cart> {
    const { userId } = createCartDto;

    // Verificar se o usuário já tem um carrinho ativo
    const existingCart = await this.cartRepository.findByUserId(userId);
    if (existingCart) {
      return existingCart;
    }

    // Criar um novo carrinho
    const now = new Date();
    const cart = new Cart(randomUUID(), userId, 0, 'active', now, now, []);

    return this.cartRepository.create(cart);
  }
}

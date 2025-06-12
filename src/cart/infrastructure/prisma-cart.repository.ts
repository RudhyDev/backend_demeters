import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service';
import { Cart } from '../domain/entities/cart.entity';
import { CartItem } from '../domain/entities/cart-item.entity';
import { CartRepository } from '../domain/interfaces/cart-repository.interface';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(cart: Cart): Promise<Cart> {
    const createdCart = await this.prisma.cart.create({
      data: {
        id: cart.id,
        userId: cart.userId,
        total: cart.total,
        status: cart.status,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
      },
      include: {
        items: true,
      },
    });

    return this.mapToEntity(createdCart);
  }

  async findById(id: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return null;
    }

    return this.mapToEntity(cart);
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId,
        status: 'active',
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      return null;
    }

    return this.mapToEntity(cart);
  }

  async update(cart: Cart): Promise<Cart> {
    // Atualizar o carrinho
    await this.prisma.cart.update({
      where: { id: cart.id },
      data: {
        total: cart.total,
        status: cart.status,
        updatedAt: cart.updatedAt,
      },
    });

    // Remover todos os itens antigos do carrinho
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    // Adicionar os novos itens ao carrinho
    if (cart.items.length > 0) {
      for (const item of cart.items) {
        // Buscar o preço atual do produto
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
        });

        if (product) {
          // Usar o preço promocional se disponível, caso contrário usar o preço normal
          const price =
            product.promotionalPrice.toNumber() > 0
              ? product.promotionalPrice.toNumber()
              : product.price.toNumber();

          await this.prisma.cartItem.create({
            data: {
              id: item.id,
              cartId: cart.id,
              productId: item.productId,
              quantity: item.quantity,
              price,
            },
          });
        }
      }
    }

    // Buscar o carrinho atualizado com os novos itens
    const updatedCart = await this.findById(cart.id);
    if (!updatedCart) {
      throw new Error(
        `Não foi possível encontrar o carrinho com ID ${cart.id} após atualização`,
      );
    }
    return updatedCart;
  }

  async delete(id: string): Promise<void> {
    // Remover todos os itens do carrinho
    await this.prisma.cartItem.deleteMany({
      where: { cartId: id },
    });

    // Remover o carrinho
    await this.prisma.cart.delete({
      where: { id },
    });
  }

  private mapToEntity(prismaCart: any): Cart {
    const items = prismaCart.items.map(
      (item) =>
        new CartItem(
          item.id,
          item.cartId,
          item.productId,
          item.quantity,
          Number(item.price),
        ),
    );

    return new Cart(
      prismaCart.id,
      prismaCart.userId,
      Number(prismaCart.total),
      prismaCart.status,
      prismaCart.createdAt,
      prismaCart.updatedAt,
      items,
    );
  }
}

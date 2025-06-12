import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddItemToCartUseCase } from '../application/use-cases/add-item-to-cart.use-case';
import { ClearCartUseCase } from '../application/use-cases/clear-cart.use-case';
import { CreateCartUseCase } from '../application/use-cases/create-cart.use-case';
import { FindCartByIdUseCase } from '../application/use-cases/find-cart-by-id.use-case';
import { FindCartByUserIdUseCase } from '../application/use-cases/find-cart-by-user-id.use-case';
import { RemoveItemFromCartUseCase } from '../application/use-cases/remove-item-from-cart.use-case';
import { UpdateCartItemUseCase } from '../application/use-cases/update-cart-item.use-case';
import { Cart } from '../domain/entities/cart.entity';
import { AddItemToCartRequestDto } from './dtos/add-item-to-cart.request.dto';
import { CreateCartRequestDto } from './dtos/create-cart.request.dto';
import { UpdateCartItemRequestDto } from './dtos/update-cart-item.request.dto';

@ApiTags('Carrinho')
@Controller('carts')
export class CartController {
  constructor(
    private readonly createCartUseCase: CreateCartUseCase,
    private readonly findCartByIdUseCase: FindCartByIdUseCase,
    private readonly findCartByUserIdUseCase: FindCartByUserIdUseCase,
    private readonly addItemToCartUseCase: AddItemToCartUseCase,
    private readonly updateCartItemUseCase: UpdateCartItemUseCase,
    private readonly removeItemFromCartUseCase: RemoveItemFromCartUseCase,
    private readonly clearCartUseCase: ClearCartUseCase,
  ) {}

  @Post()
  // @UseGuards(JwtAuthGuard) - Implementar autenticação posteriormente
  @ApiOperation({ summary: 'Criar um novo carrinho' })
  @ApiResponse({
    status: 201,
    description: 'Carrinho criado com sucesso',
    type: Cart,
  })
  async createCart(@Body() createCartDto: CreateCartRequestDto): Promise<Cart> {
    return this.createCartUseCase.execute({
      userId: createCartDto.userId,
    });
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard) - Implementar autenticação posteriormente
  @ApiOperation({ summary: 'Buscar um carrinho pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Carrinho encontrado',
    type: Cart,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrinho não encontrado',
  })
  async findCartById(@Param('id') id: string): Promise<Cart> {
    return this.findCartByIdUseCase.execute(id);
  }

  @Get('user/:userId')
  // @UseGuards(JwtAuthGuard) - Implementar autenticação posteriormente
  @ApiOperation({ summary: 'Buscar o carrinho de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Carrinho encontrado',
    type: Cart,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrinho não encontrado',
  })
  async findCartByUserId(@Param('userId') userId: string): Promise<Cart> {
    const cart = await this.findCartByUserIdUseCase.execute(userId);

    if (!cart) {
      // Se o usuário não tiver um carrinho, criar um novo
      return this.createCartUseCase.execute({ userId });
    }

    return cart;
  }

  @Post(':id/items')
  // @UseGuards(JwtAuthGuard) - Implementar autenticação posteriormente
  @ApiOperation({ summary: 'Adicionar um item ao carrinho' })
  @ApiResponse({
    status: 201,
    description: 'Item adicionado com sucesso',
    type: Cart,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrinho não encontrado',
  })
  async addItemToCart(
    @Param('id') id: string,
    @Body() addItemDto: AddItemToCartRequestDto,
  ): Promise<Cart> {
    return this.addItemToCartUseCase.execute({
      cartId: id,
      productId: addItemDto.productId,
      quantity: addItemDto.quantity,
    });
  }

  @Put(':id/items')
  // @UseGuards(JwtAuthGuard) - Implementar autenticação posteriormente
  @ApiOperation({ summary: 'Atualizar a quantidade de um item no carrinho' })
  @ApiResponse({
    status: 200,
    description: 'Item atualizado com sucesso',
    type: Cart,
  })
  @ApiResponse({
    status: 404,
    description: 'Carrinho não encontrado',
  })
  async updateCartItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateCartItemRequestDto,
  ): Promise<Cart> {
    return this.updateCartItemUseCase.execute({
      cartId: id,
      productId: updateItemDto.productId,
      quantity: updateItemDto.quantity,
    });
  }

  @Delete(':id/items/:productId')
  // @UseGuards(JwtAuthGuard) - Implementar autenticação posteriormente
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um item do carrinho' })
  @ApiResponse({
    status: 204,
    description: 'Item removido com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Carrinho não encontrado',
  })
  async removeItemFromCart(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ): Promise<void> {
    await this.removeItemFromCartUseCase.execute({
      cartId: id,
      productId,
    });
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard) - Implementar autenticação posteriormente
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Limpar o carrinho' })
  @ApiResponse({
    status: 204,
    description: 'Carrinho limpo com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Carrinho não encontrado',
  })
  async clearCart(@Param('id') id: string): Promise<void> {
    await this.clearCartUseCase.execute(id);
  }
}

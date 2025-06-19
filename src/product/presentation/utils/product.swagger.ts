import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';
import { ProductResponseDto } from '../../application/dtos/product-response.dto';

export function CreateProductSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cadastrar produto',
      description:
        'Cria um novo produto associado a um fornecedor (vendor) já existente.',
      operationId: 'createProduct',
    }),
    ApiBody({
      type: CreateProductDto,
      examples: {
        CreateProductDto: {
          value: {
            vendorId: '2d3f3fa4-456a-4c9d-b0f3-3f6d5c1a1e1f', // ID de vendor existente
            name: 'Banana Nanica',
            description: 'Bananas frescas selecionadas',
            price: 5.5,
            promotionalPrice: 4.9,
            category: 'Frutas',
            unit: 'kg',
            stock: 100,
            isAvailable: true,
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Produto criado com sucesso',
      type: ProductResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
    ApiResponse({ status: 409, description: 'Produto duplicado' }),
    ApiResponse({ status: 500, description: 'Erro ao criar produto' }),
  );
}

export function FindAllProductsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar produtos',
      description: 'Retorna todos os produtos cadastrados na plataforma',
      operationId: 'findAllProducts',
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de produtos retornada com sucesso',
      type: [ProductResponseDto],
    }),
    ApiResponse({ status: 500, description: 'Erro ao buscar produtos' }),
  );
}

export function FindProductByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar produto por ID',
      description: 'Retorna os dados de um produto específico pelo ID',
      operationId: 'findProductById',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do produto',
      example: '7fa4bc77-7d18-4d3d-8f3a-2cca4e6bb0bd',
    }),
    ApiResponse({
      status: 200,
      description: 'Produto encontrado com sucesso',
      type: ProductResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Produto não encontrado' }),
    ApiResponse({ status: 500, description: 'Erro ao buscar produto' }),
  );
}

export function UpdateProductSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualizar produto',
      description: 'Atualiza os dados de um produto existente',
      operationId: 'updateProduct',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do produto',
      example: '7fa4bc77-7d18-4d3d-8f3a-2cca4e6bb0bd',
    }),
    ApiBody({
      type: UpdateProductDto,
      examples: {
        UpdateProductDto: {
          value: {
            name: 'Banana Prata',
            price: 6.0,
            promotionalPrice: 5.5,
            stock: 80,
            isAvailable: true,
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Produto atualizado com sucesso',
      type: ProductResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Produto não encontrado' }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
    ApiResponse({ status: 500, description: 'Erro ao atualizar produto' }),
  );
}

export function DeleteProductSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Excluir produto',
      description: 'Remove um produto da plataforma',
      operationId: 'deleteProduct',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do produto',
      example: '7fa4bc77-7d18-4d3d-8f3a-2cca4e6bb0bd',
    }),
    ApiResponse({ status: 204, description: 'Produto excluído com sucesso' }),
    ApiResponse({ status: 404, description: 'Produto não encontrado' }),
    ApiResponse({ status: 500, description: 'Erro ao excluir produto' }),
  );
}

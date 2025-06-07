import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateVendorDto } from '../../application/dtos/create-vendor.dto';
import { UpdateVendorDto } from '../../application/dtos/update-vendor.dto';
import { VendorResponseDto } from '../../application/dtos/vendor-response.dto';

export function CreateVendorSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cadastrar loja',
      description:
        'Cria uma nova loja (vendor) na plataforma associada a um usuário existente. O userId deve ser o ID de um usuário já cadastrado no sistema.',
      operationId: 'createVendor',
    }),
    ApiBody({
      type: CreateVendorDto,
      examples: {
        CreateVendorDto: {
          value: {
            userId: '63613c08-0cca-49d6-a959-1c9ffa8c1816', // ID de um usuário existente no sistema
            storeName: 'Mercado do João',
            description: 'Mercado de produtos orgânicos',
            cnpj: '12.345.678/0001-90',
            openingHours: 'Segunda a Sexta: 08h às 18h',
            isDeliveryAvailable: true,
            isPickupAvailable: true,
            status: 'ACTIVE',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Loja cadastrada com sucesso',
      type: VendorResponseDto,
    }),
    ApiResponse({
      status: 409,
      description: 'Já existe uma loja com esse nome ou CNPJ',
    }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
    ApiResponse({ status: 500, description: 'Erro ao cadastrar loja' }),
  );
}

export function FindAllVendorsSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar todas as lojas',
      description: 'Retorna todas as lojas cadastradas na plataforma',
      operationId: 'findAllVendors',
    }),
    ApiResponse({
      status: 200,
      description: 'Lista de lojas retornada com sucesso',
      type: [VendorResponseDto],
    }),
    ApiResponse({ status: 500, description: 'Erro ao buscar lojas' }),
  );
}

export function FindVendorByIdSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar loja por ID',
      description: 'Retorna os dados de uma loja específica pelo ID',
      operationId: 'findVendorById',
    }),
    ApiParam({
      name: 'id',
      description: 'ID da loja',
      example: '63613c08-0cca-49d6-a959-1c9ffa8c1816',
    }),
    ApiResponse({
      status: 200,
      description: 'Loja encontrada com sucesso',
      type: VendorResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Loja não encontrada' }),
    ApiResponse({ status: 500, description: 'Erro ao buscar loja' }),
  );
}

export function UpdateVendorSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualizar loja',
      description: 'Atualiza os dados de uma loja existente',
      operationId: 'updateVendor',
    }),
    ApiParam({
      name: 'id',
      description: 'ID da loja',
      example: '63613c08-0cca-49d6-a959-1c9ffa8c1816',
    }),
    ApiBody({
      type: UpdateVendorDto,
      examples: {
        UpdateVendorDto: {
          value: {
            storeName: 'Mercado do João Atualizado',
            description: 'Mercado de produtos orgânicos e naturais',
            openingHours: 'Segunda a Sábado: 08h às 20h',
            isDeliveryAvailable: true,
            isPickupAvailable: true,
            status: 'ACTIVE',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Loja atualizada com sucesso',
      type: VendorResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Loja não encontrada' }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
    ApiResponse({ status: 500, description: 'Erro ao atualizar loja' }),
  );
}

export function DeleteVendorSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Excluir loja',
      description: 'Remove uma loja da plataforma',
      operationId: 'deleteVendor',
    }),
    ApiParam({
      name: 'id',
      description: 'ID da loja',
      example: '63613c08-0cca-49d6-a959-1c9ffa8c1816',
    }),
    ApiResponse({
      status: 204,
      description: 'Loja excluída com sucesso',
    }),
    ApiResponse({ status: 404, description: 'Loja não encontrada' }),
    ApiResponse({ status: 500, description: 'Erro ao excluir loja' }),
  );
}

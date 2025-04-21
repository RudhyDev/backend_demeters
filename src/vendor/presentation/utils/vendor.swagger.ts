import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterVendorDto } from '../../application/dtos/register-vendor.dto';
import { UpdateVendorDto } from '../../application/dtos/update-vendor.dto';

export function RegisterVendorSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Registrar loja', description: 'Cria uma nova loja (Vendor)', operationId: 'registerVendor' }),
    ApiBody({
      type: RegisterVendorDto,
      examples: {
        RegisterVendorDto: {
          value: {
            userId: '63613c08-0cca-49d6-a959-1c9ffa8c1816',
            storeName: 'Empório da Esquina',
            description: 'Loja de produtos naturais e orgânicos',
            cnpj: '12.345.678/0001-90',
            openingHours: 'Seg a Sex 08:00-18:00',
            isDeliveryAvailable: true,
            isPickupAvailable: true
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Loja registrada com sucesso',
      schema: { example: { id: 'a2e1f2c3-9b4a-4e5f-8a6c-2b7d4e9f0a1b' } },
    }),
  );
}

export function UpdateVendorSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Atualizar loja', description: 'Atualiza dados da loja (Vendor)', operationId: 'updateVendor' }),
    ApiBody({
      type: UpdateVendorDto,
      examples: {
        UpdateVendorDto: {
          value: {
            storeName: 'Empório da Esquina Atualizado',
            description: 'Agora também com produtos veganos',
            openingHours: 'Seg a Sab 08:00-20:00',
            isDeliveryAvailable: false,
            isPickupAvailable: true,
            status: 'ACTIVE'
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Loja atualizada com sucesso',
    }),
  );
}

// Decorator para buscar loja por ID
export function FindVendorByIdSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Buscar loja por ID', description: 'Retorna os dados de uma loja pelo ID', operationId: 'findVendorById' }),
    ApiResponse({ status: 200, description: 'Loja encontrada', schema: { example: {
      id: 'a2e1f2c3-9b4a-4e5f-8a6c-2b7d4e9f0a1b',
      userId: '63613c08-0cca-49d6-a959-1c9ffa8c1816',
      storeName: 'Empório da Esquina',
      description: 'Loja de produtos naturais e orgânicos',
      cnpj: '12.345.678/0001-90',
      openingHours: 'Seg a Sex 08:00-18:00',
      isDeliveryAvailable: true,
      isPickupAvailable: true,
      status: 'ACTIVE',
      createdAt: '2025-04-21T13:00:00.000Z',
      updatedAt: '2025-04-21T13:00:00.000Z'
    } } }),
    ApiResponse({ status: 404, description: 'Loja não encontrada' })
  );
}

// Decorator para buscar loja por userId
export function FindVendorByUserIdSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Buscar loja por usuário', description: 'Retorna a loja vinculada a um usuário', operationId: 'findVendorByUserId' }),
    ApiResponse({ status: 200, description: 'Loja encontrada', schema: { example: {
      id: 'a2e1f2c3-9b4a-4e5f-8a6c-2b7d4e9f0a1b',
      userId: '63613c08-0cca-49d6-a959-1c9ffa8c1816',
      storeName: 'Empório da Esquina',
      description: 'Loja de produtos naturais e orgânicos',
      cnpj: '12.345.678/0001-90',
      openingHours: 'Seg a Sex 08:00-18:00',
      isDeliveryAvailable: true,
      isPickupAvailable: true,
      status: 'ACTIVE',
      createdAt: '2025-04-21T13:00:00.000Z',
      updatedAt: '2025-04-21T13:00:00.000Z'
    } } }),
    ApiResponse({ status: 404, description: 'Loja não encontrada' })
  );
}

// Decorator para buscar loja por nome
export function FindVendorByStoreNameSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Buscar loja por nome', description: 'Retorna a loja pelo nome', operationId: 'findVendorByStoreName' }),
    ApiResponse({ status: 200, description: 'Loja encontrada', schema: { example: {
      id: 'a2e1f2c3-9b4a-4e5f-8a6c-2b7d4e9f0a1b',
      userId: '63613c08-0cca-49d6-a959-1c9ffa8c1816',
      storeName: 'Empório da Esquina',
      description: 'Loja de produtos naturais e orgânicos',
      cnpj: '12.345.678/0001-90',
      openingHours: 'Seg a Sex 08:00-18:00',
      isDeliveryAvailable: true,
      isPickupAvailable: true,
      status: 'ACTIVE',
      createdAt: '2025-04-21T13:00:00.000Z',
      updatedAt: '2025-04-21T13:00:00.000Z'
    } } }),
    ApiResponse({ status: 404, description: 'Loja não encontrada' })
  );
}

// Decorator para listar todas as lojas
export function FindAllVendorsSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Listar lojas', description: 'Retorna todas as lojas cadastradas', operationId: 'findAllVendors' }),
    ApiResponse({ status: 200, description: 'Lista de lojas', schema: { example: [
      {
        id: 'a2e1f2c3-9b4a-4e5f-8a6c-2b7d4e9f0a1b',
        userId: '63613c08-0cca-49d6-a959-1c9ffa8c1816',
        storeName: 'Empório da Esquina',
        description: 'Loja de produtos naturais e orgânicos',
        cnpj: '12.345.678/0001-90',
        openingHours: 'Seg a Sex 08:00-18:00',
        isDeliveryAvailable: true,
        isPickupAvailable: true,
        status: 'ACTIVE',
        createdAt: '2025-04-21T13:00:00.000Z',
        updatedAt: '2025-04-21T13:00:00.000Z'
      }
    ] } })
  );
}

// Decorator para deletar loja
export function DeleteVendorSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Deletar loja', description: 'Remove uma loja pelo ID', operationId: 'deleteVendor' }),
    ApiResponse({ status: 200, description: 'Loja deletada com sucesso' }),
    ApiResponse({ status: 404, description: 'Loja não encontrada' })
  );
}

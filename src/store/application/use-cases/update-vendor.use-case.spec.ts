import { Test, TestingModule } from '@nestjs/testing';
import { UpdateVendorUseCase } from './update-vendor.use-case';
import { VENDOR_REPOSITORY, VendorRepository } from '../../domain/interfaces/store-repository.interface';
import { Vendor } from '../../domain/entities/store.entity';
import { VendorNotFoundException } from '../../domain/exceptions/vendor-not-found.exception';
import { UpdateVendorDto } from '../dtos/update-vendor.dto';

describe('UpdateVendorUseCase', () => {
  let useCase: UpdateVendorUseCase;
  let vendorRepository: jest.Mocked<VendorRepository>;

  beforeEach(async () => {
    vendorRepository = {
      create: jest.fn(),
      update: jest.fn(),
      findById: jest.fn(),
      findByStoreName: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
      existsByStoreName: jest.fn(),
      existsByCnpj: jest.fn(),
    } as jest.Mocked<VendorRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateVendorUseCase,
        {
          provide: VENDOR_REPOSITORY,
          useValue: vendorRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateVendorUseCase>(UpdateVendorUseCase);
  });

  it('deve atualizar uma loja com sucesso', async () => {
    // Arrange
    const vendorId = '123e4567-e89b-12d3-a456-426614174001';
    const updateVendorDto: UpdateVendorDto = {
      storeName: 'Loja Atualizada',
      description: 'Nova descrição da loja',
      openingHours: 'Segunda a Domingo: 08h às 22h',
      isDeliveryAvailable: true,
      isPickupAvailable: false,
      status: 'ACTIVE',
    };

    const existingVendor: Vendor = {
      id: vendorId,
      userId: '123e4567-e89b-12d3-a456-426614174000',
      storeName: 'Loja Original',
      description: 'Descrição original',
      cnpj: '12.345.678/0001-90',
      openingHours: 'Segunda a Sexta: 08h às 18h',
      isDeliveryAvailable: false,
      isPickupAvailable: true,
      status: 'INACTIVE',
      products: [],
    };

    const updatedVendor: Vendor = {
      ...existingVendor,
      ...updateVendorDto,
    };

    vendorRepository.findById.mockResolvedValue(existingVendor);
    vendorRepository.update.mockResolvedValue(updatedVendor);

    // Act
    const result = await useCase.execute(vendorId, updateVendorDto);

    // Assert
    expect(vendorRepository.findById).toHaveBeenCalledWith(vendorId);
    expect(vendorRepository.update).toHaveBeenCalledWith(vendorId, updateVendorDto);
    expect(result).toEqual(updatedVendor);
  });

  it('should throw an error if vendor is not found', async () => {
    // Arrange
    const id = '1';
    const updateVendorDto: UpdateVendorDto = {
      storeName: 'Updated Vendor',
      description: 'Updated description',
      openingHours: 'Updated opening hours',
      isDeliveryAvailable: true,
      isPickupAvailable: false,
      status: 'ACTIVE',
    };
    vendorRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(id, updateVendorDto)).rejects.toThrow(
      VendorNotFoundException,
    );
    await expect(useCase.execute(id, updateVendorDto)).rejects.toThrow(
      `Loja com ID ${id} não encontrada`,
    );
    expect(vendorRepository.findById).toHaveBeenCalledWith(id);
    expect(vendorRepository.update).not.toHaveBeenCalled();
  });
});

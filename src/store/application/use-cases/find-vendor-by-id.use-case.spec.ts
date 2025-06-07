import { Test, TestingModule } from '@nestjs/testing';
import { FindVendorByIdUseCase } from './find-vendor-by-id.use-case';
import { VendorRepository, VENDOR_REPOSITORY } from '../../domain/interfaces/store-repository.interface';
import { Vendor } from '../../domain/entities/store.entity';
import { VendorNotFoundException } from '../../domain/exceptions/vendor-not-found.exception';

describe('FindVendorByIdUseCase', () => {
  let useCase: FindVendorByIdUseCase;
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
        FindVendorByIdUseCase,
        {
          provide: VENDOR_REPOSITORY,
          useValue: vendorRepository,
        },
      ],
    }).compile();

    useCase = module.get<FindVendorByIdUseCase>(FindVendorByIdUseCase);
  });

  it('deve retornar uma loja quando encontrada pelo ID', async () => {
    // Arrange
    const vendorId = '123e4567-e89b-12d3-a456-426614174001';
    const vendor: Vendor = {
      id: vendorId,
      userId: '123e4567-e89b-12d3-a456-426614174000',
      storeName: 'Loja Teste',
      description: 'Descrição da loja teste',
      cnpj: '12.345.678/0001-90',
      openingHours: 'Segunda a Sexta: 08h às 18h',
      isDeliveryAvailable: true,
      isPickupAvailable: true,
      status: 'ACTIVE',
      products: [],
    };

    vendorRepository.findById.mockResolvedValue(vendor);

    // Act
    const result = await useCase.execute(vendorId);

    // Assert
    expect(vendorRepository.findById).toHaveBeenCalledWith(vendorId);
    expect(result).toEqual(vendor);
  });

  it('deve lançar VendorNotFoundException quando a loja não é encontrada', async () => {
    // Arrange
    const vendorId = '123e4567-e89b-12d3-a456-426614174001';
    vendorRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(vendorId)).rejects.toThrow(
      new VendorNotFoundException(`Loja com ID ${vendorId} não encontrada`),
    );
    expect(vendorRepository.findById).toHaveBeenCalledWith(vendorId);
  });
});

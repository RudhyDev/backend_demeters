import { Test, TestingModule } from '@nestjs/testing';
import { FindAllVendorsUseCase } from './find-all-vendors.use-case';
import { VendorRepository, VENDOR_REPOSITORY } from '../../domain/interfaces/store-repository.interface';
import { Vendor } from '../../domain/entities/store.entity';

describe('FindAllVendorsUseCase', () => {
  let useCase: FindAllVendorsUseCase;
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
        FindAllVendorsUseCase,
        {
          provide: VENDOR_REPOSITORY,
          useValue: vendorRepository,
        },
      ],
    }).compile();

    useCase = module.get<FindAllVendorsUseCase>(FindAllVendorsUseCase);
  });

  it('deve retornar uma lista de todas as lojas', async () => {
    // Arrange
    const vendors: Vendor[] = [
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        userId: '123e4567-e89b-12d3-a456-426614174000',
        storeName: 'Loja 1',
        description: 'Descrição da loja 1',
        cnpj: '12.345.678/0001-90',
        openingHours: 'Segunda a Sexta: 08h às 18h',
        isDeliveryAvailable: true,
        isPickupAvailable: true,
        status: 'ACTIVE',
        products: [],
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174002',
        userId: '123e4567-e89b-12d3-a456-426614174003',
        storeName: 'Loja 2',
        description: 'Descrição da loja 2',
        cnpj: '98.765.432/0001-10',
        openingHours: 'Segunda a Sábado: 09h às 20h',
        isDeliveryAvailable: false,
        isPickupAvailable: true,
        status: 'ACTIVE',
        products: [],
      },
    ];

    vendorRepository.findAll.mockResolvedValue(vendors);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(vendorRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(vendors);
    expect(result.length).toBe(2);
  });

  it('deve retornar uma lista vazia quando não há lojas cadastradas', async () => {
    // Arrange
    vendorRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(vendorRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
});

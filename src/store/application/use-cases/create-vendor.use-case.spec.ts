import { Test, TestingModule } from '@nestjs/testing';
import { CreateVendorUseCase } from './create-vendor.use-case';
import { VendorRepository, VENDOR_REPOSITORY } from '../../domain/interfaces/store-repository.interface';
import { Vendor } from '../../domain/entities/store.entity';
import { CreateVendorDto } from '../dtos/create-vendor.dto';

describe('CreateVendorUseCase', () => {
  let useCase: CreateVendorUseCase;
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
        CreateVendorUseCase,
        {
          provide: VENDOR_REPOSITORY,
          useValue: vendorRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateVendorUseCase>(CreateVendorUseCase);
  });

  it('deve criar uma nova loja com sucesso', async () => {
    // Arrange
    const createVendorDto: CreateVendorDto = {
      userId: '123e4567-e89b-12d3-a456-426614174000',
      storeName: 'Loja Teste',
      description: 'Descrição da loja teste',
      cnpj: '12.345.678/0001-90',
      openingHours: 'Segunda a Sexta: 08h às 18h',
      isDeliveryAvailable: true,
      isPickupAvailable: true,
      status: 'ACTIVE',
    };

    const createdVendor: Vendor = {
      id: '123e4567-e89b-12d3-a456-426614174001',
      ...createVendorDto,
      products: [],
    };

    vendorRepository.existsByStoreName.mockResolvedValue(false);
    vendorRepository.existsByCnpj.mockResolvedValue(false);
    vendorRepository.create.mockResolvedValue(createdVendor);

    // Act
    const result = await useCase.execute(createVendorDto);

    // Assert
    expect(vendorRepository.existsByStoreName).toHaveBeenCalledWith(createVendorDto.storeName);
    expect(vendorRepository.existsByCnpj).toHaveBeenCalledWith(createVendorDto.cnpj);
    expect(vendorRepository.create).toHaveBeenCalledWith(expect.objectContaining(createVendorDto));
    expect(result).toEqual(createdVendor);
  });

  it('deve lançar erro quando já existe uma loja com o mesmo nome', async () => {
    // Arrange
    const createVendorDto: CreateVendorDto = {
      userId: '123e4567-e89b-12d3-a456-426614174000',
      storeName: 'Loja Existente',
      description: 'Descrição da loja',
      cnpj: '12.345.678/0001-90',
      openingHours: 'Segunda a Sexta: 08h às 18h',
      isDeliveryAvailable: true,
      isPickupAvailable: true,
      status: 'ACTIVE',
    };

    vendorRepository.existsByStoreName.mockResolvedValue(true);

    // Act & Assert
    await expect(useCase.execute(createVendorDto)).rejects.toThrow('Já existe uma loja com esse nome.');
    expect(vendorRepository.existsByStoreName).toHaveBeenCalledWith(createVendorDto.storeName);
    expect(vendorRepository.create).not.toHaveBeenCalled();
  });

  it('deve lançar erro quando já existe uma loja com o mesmo CNPJ', async () => {
    // Arrange
    const createVendorDto: CreateVendorDto = {
      userId: '123e4567-e89b-12d3-a456-426614174000',
      storeName: 'Loja Nova',
      description: 'Descrição da loja',
      cnpj: '12.345.678/0001-90',
      openingHours: 'Segunda a Sexta: 08h às 18h',
      isDeliveryAvailable: true,
      isPickupAvailable: true,
      status: 'ACTIVE',
    };

    vendorRepository.existsByStoreName.mockResolvedValue(false);
    vendorRepository.existsByCnpj.mockResolvedValue(true);

    // Act & Assert
    await expect(useCase.execute(createVendorDto)).rejects.toThrow('Já existe uma loja com esse CNPJ.');
    expect(vendorRepository.existsByStoreName).toHaveBeenCalledWith(createVendorDto.storeName);
    expect(vendorRepository.existsByCnpj).toHaveBeenCalledWith(createVendorDto.cnpj);
    expect(vendorRepository.create).not.toHaveBeenCalled();
  });
});

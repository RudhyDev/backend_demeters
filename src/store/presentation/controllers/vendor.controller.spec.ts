import { HttpException, HttpStatus } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { CreateVendorUseCase } from '../../application/use-cases/create-vendor.use-case';
import { UpdateVendorUseCase } from '../../application/use-cases/update-vendor.use-case';
import { FindVendorByIdUseCase } from '../../application/use-cases/find-vendor-by-id.use-case';
import { FindAllVendorsUseCase } from '../../application/use-cases/find-all-vendors.use-case';
import { DeleteVendorUseCase } from '../../application/use-cases/delete-vendor.use-case';
import { Vendor } from '../../domain/entities/store.entity';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { CreateVendorDto } from '../../application/dtos/create-vendor.dto';
import { UpdateVendorDto } from '../../application/dtos/update-vendor.dto';

const sampleVendor: Vendor = {
  id: '1',
  userId: 'u1',
  storeName: 'Store',
  description: 'Desc',
  cnpj: '1',
  openingHours: '9-17',
  isDeliveryAvailable: true,
  isPickupAvailable: true,
  status: 'ACTIVE',
  products: [],
};

describe('VendorController', () => {
  let controller: VendorController;
  let createUseCase: jest.Mocked<CreateVendorUseCase>;
  let updateUseCase: jest.Mocked<UpdateVendorUseCase>;
  let findByIdUseCase: jest.Mocked<FindVendorByIdUseCase>;
  let findAllUseCase: jest.Mocked<FindAllVendorsUseCase>;
  let deleteUseCase: jest.Mocked<DeleteVendorUseCase>;

  beforeEach(() => {
    createUseCase = { execute: jest.fn() } as any;
    updateUseCase = { execute: jest.fn() } as any;
    findByIdUseCase = { execute: jest.fn() } as any;
    findAllUseCase = { execute: jest.fn() } as any;
    deleteUseCase = { execute: jest.fn() } as any;

    controller = new VendorController(
      createUseCase,
      updateUseCase,
      findByIdUseCase,
      findAllUseCase,
      deleteUseCase,
    );
  });

  describe('create', () => {
    it('should return created vendor', async () => {
      const dto: CreateVendorDto = {
        userId: 'u1',
        storeName: 'Store',
        description: 'Desc',
        cnpj: '1',
        openingHours: '9-17',
        isDeliveryAvailable: true,
        isPickupAvailable: true,
        status: 'ACTIVE',
      };
      createUseCase.execute.mockResolvedValue(sampleVendor);

      await expect(controller.create(dto)).resolves.toEqual({ ...sampleVendor });
      expect(createUseCase.execute).toHaveBeenCalledWith(dto);
    });

    it('should throw HttpException when user not found', async () => {
      createUseCase.execute.mockRejectedValue(new UserNotFoundException('not found'));
      const dto = {
        userId: 'u1',
        storeName: '',
        description: '',
        cnpj: '',
        openingHours: '',
        isDeliveryAvailable: true,
        isPickupAvailable: true,
        status: 'ACTIVE',
      } as CreateVendorDto;

      await expect(controller.create(dto)).rejects.toEqual(
        new HttpException('not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  it('findAll should return vendor list', async () => {
    findAllUseCase.execute.mockResolvedValue([sampleVendor]);
    await expect(controller.findAll()).resolves.toEqual([{ ...sampleVendor }]);
    expect(findAllUseCase.execute).toHaveBeenCalled();
  });

  it('findOne should return vendor', async () => {
    findByIdUseCase.execute.mockResolvedValue(sampleVendor);
    await expect(controller.findOne('1')).resolves.toEqual({ ...sampleVendor });
    expect(findByIdUseCase.execute).toHaveBeenCalledWith('1');
  });

  it('update should return updated vendor', async () => {
    const dto: UpdateVendorDto = { storeName: 'new' };
    const updated = { ...sampleVendor, storeName: 'new' };
    updateUseCase.execute.mockResolvedValue(updated);

    await expect(controller.update('1', dto)).resolves.toEqual(updated);
    expect(updateUseCase.execute).toHaveBeenCalledWith('1', dto);
  });

  it('remove should call deleteUseCase', async () => {
    deleteUseCase.execute.mockResolvedValue();
    await controller.remove('1');
    expect(deleteUseCase.execute).toHaveBeenCalledWith('1');
  });
});

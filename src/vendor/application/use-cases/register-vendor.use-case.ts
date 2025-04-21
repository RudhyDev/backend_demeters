import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { IVendorRepository } from '../../domain/interfaces/repositories/vendor-repository.interface';
import { RegisterVendorDto } from '../dtos/register-vendor.dto';
import { Vendor } from '../../domain/entities/vendor.entity';
import { randomUUID, UUID } from 'crypto';

@Injectable()
export class RegisterVendorUseCase {
  constructor(
    @Inject('IVendorRepository')
    private readonly vendorRepository: IVendorRepository,
  ) {}

  async execute(dto: RegisterVendorDto): Promise<{ id: string }> {
    // Verifica duplicidade de loja pelo userId ou storeName
    const exists = await this.vendorRepository.findByUserId(dto.userId);
    if (exists) {
      throw new ConflictException('Usuário já possui uma loja cadastrada');
    }
    const existsByName = await this.vendorRepository.findByStoreName(
      dto.storeName,
    );
    if (existsByName) {
      throw new ConflictException('Já existe uma loja com esse nome');
    }
    // Criação da entidade
    const vendor = new Vendor(
      randomUUID() as UUID,
      dto.userId as any,
      dto.storeName,
      dto.description,
      dto.cnpj,
      dto.openingHours,
      dto.isDeliveryAvailable,
      dto.isPickupAvailable,
      'ACTIVE',
      new Date(),
      new Date(),
    );
    await this.vendorRepository.create(vendor);
    return { id: vendor.id };
  }
}

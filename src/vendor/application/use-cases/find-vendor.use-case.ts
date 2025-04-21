import { Injectable, Inject } from '@nestjs/common';
import { IVendorRepository } from '../../domain/interfaces/repositories/vendor-repository.interface';
import { Vendor } from '../../domain/entities/vendor.entity';

@Injectable()
export class FindVendorUseCase {
  constructor(
    @Inject('IVendorRepository')
    private readonly vendorRepository: IVendorRepository,
  ) {}

  async byId(id: string): Promise<Vendor | null> {
    return await this.vendorRepository.findById(id);
  }

  async byUserId(userId: string): Promise<Vendor | null> {
    return await this.vendorRepository.findByUserId(userId);
  }

  async byStoreName(storeName: string): Promise<Vendor | null> {
    return await this.vendorRepository.findByStoreName(storeName);
  }

  async all(): Promise<Vendor[]> {
    return await this.vendorRepository.findAll();
  }
}

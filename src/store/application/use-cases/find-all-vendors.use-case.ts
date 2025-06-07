import { Inject, Injectable } from '@nestjs/common';
import { VendorRepository, VENDOR_REPOSITORY } from '../../domain/interfaces/store-repository.interface';
import { Vendor } from '../../domain/entities/store.entity';

@Injectable()
export class FindAllVendorsUseCase {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepository: VendorRepository,
  ) {}

  async execute(): Promise<Vendor[]> {
    return this.vendorRepository.findAll();
  }
}

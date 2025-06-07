import { Inject, Injectable } from '@nestjs/common';
import { VendorRepository, VENDOR_REPOSITORY } from '../../domain/interfaces/store-repository.interface';
import { VendorNotFoundException } from '../../domain/exceptions/vendor-not-found.exception';
import { Vendor } from '../../domain/entities/store.entity';

@Injectable()
export class FindVendorByIdUseCase {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepository: VendorRepository,
  ) {}

  async execute(id: string): Promise<Vendor> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      throw new VendorNotFoundException(`Loja com ID ${id} não encontrada`);
    }
    return vendor;
  }
}

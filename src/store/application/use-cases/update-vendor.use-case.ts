import { Inject, Injectable } from '@nestjs/common';
import { VendorRepository, VENDOR_REPOSITORY } from '../../domain/interfaces/store-repository.interface';
import { UpdateVendorDto } from '../dtos/update-vendor.dto';
import { Vendor } from '../../domain/entities/store.entity';
import { VendorNotFoundException } from '../../domain/exceptions/vendor-not-found.exception';

@Injectable()
export class UpdateVendorUseCase {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepository: VendorRepository,
  ) {}

  async execute(id: string, input: UpdateVendorDto): Promise<Vendor> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      throw new VendorNotFoundException(`Loja com ID ${id} não encontrada`);
    }
    return this.vendorRepository.update(id, input);
  }
}

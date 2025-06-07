import { Inject, Injectable } from '@nestjs/common';
import { VendorRepository, VENDOR_REPOSITORY } from '../../domain/interfaces/store-repository.interface';
import { UpdateVendorDto } from '../dtos/update-vendor.dto';
import { Vendor } from '../../domain/entities/store.entity';

@Injectable()
export class UpdateVendorUseCase {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepository: VendorRepository,
  ) {}

  async execute(id: string, input: UpdateVendorDto): Promise<Vendor> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      throw new Error('Loja não encontrada.');
    }
    return this.vendorRepository.update(id, input);
  }
}

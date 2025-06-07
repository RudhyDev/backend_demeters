import { Inject, Injectable } from '@nestjs/common';
import { VendorRepository, VENDOR_REPOSITORY } from '../../domain/interfaces/store-repository.interface';
import { VendorNotFoundException } from '../../domain/exceptions/vendor-not-found.exception';

@Injectable()
export class DeleteVendorUseCase {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepository: VendorRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      throw new VendorNotFoundException(`Loja com ID ${id} não encontrada`);
    }
    await this.vendorRepository.delete(id);
  }
}

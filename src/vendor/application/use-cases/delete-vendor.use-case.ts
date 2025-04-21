import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IVendorRepository } from '../../domain/interfaces/repositories/vendor-repository.interface';

@Injectable()
export class DeleteVendorUseCase {
  constructor(
    @Inject('IVendorRepository')
    private readonly vendorRepository: IVendorRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      throw new NotFoundException('Loja não encontrada');
    }
    await this.vendorRepository.delete(id);
  }
}

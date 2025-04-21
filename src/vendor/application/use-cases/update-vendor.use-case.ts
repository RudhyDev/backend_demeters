import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IVendorRepository } from '../../domain/interfaces/repositories/vendor-repository.interface';
import { UpdateVendorDto } from '../dtos/update-vendor.dto';

@Injectable()
export class UpdateVendorUseCase {
  constructor(
    @Inject('IVendorRepository')
    private readonly vendorRepository: IVendorRepository,
  ) {}

  async execute(id: string, dto: UpdateVendorDto): Promise<void> {
    const vendor = await this.vendorRepository.findById(id);
    if (!vendor) {
      throw new NotFoundException('Loja não encontrada');
    }
    // Atualiza os campos permitidos
    if (dto.storeName) vendor["_storeName"] = dto.storeName;
    if (dto.description) vendor["_description"] = dto.description;
    if (dto.cnpj) vendor["_cnpj"] = dto.cnpj;
    if (dto.openingHours) vendor["_openingHours"] = dto.openingHours;
    if (dto.isDeliveryAvailable !== undefined) vendor["_isDeliveryAvailable"] = dto.isDeliveryAvailable;
    if (dto.isPickupAvailable !== undefined) vendor["_isPickupAvailable"] = dto.isPickupAvailable;
    if (dto.status) vendor["_status"] = dto.status;
    await this.vendorRepository.update(vendor);
  }
}

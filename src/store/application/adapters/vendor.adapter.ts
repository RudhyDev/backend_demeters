import { Vendor } from '../../domain/entities/store.entity';
import { VendorResponseDto } from '../dtos/vendor-response.dto';

export class VendorAdapter {
  static toDto(vendor: Vendor): VendorResponseDto {
    return {
      id: vendor.id,
      userId: vendor.userId,
      storeName: vendor.storeName,
      description: vendor.description,
      cnpj: vendor.cnpj,
      openingHours: vendor.openingHours,
      isDeliveryAvailable: vendor.isDeliveryAvailable,
      isPickupAvailable: vendor.isPickupAvailable,
      status: vendor.status,
      products: vendor.products,
    };
  }

  static toDtoList(vendors: Vendor[]): VendorResponseDto[] {
    return vendors.map((vendor) => this.toDto(vendor));
  }
}

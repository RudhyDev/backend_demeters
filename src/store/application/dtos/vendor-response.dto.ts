import { ProductResponseDto } from './product-response.dto';

export class VendorResponseDto {
  id: string;
  userId: string;
  storeName: string;
  description: string;
  cnpj: string;
  openingHours: string;
  isDeliveryAvailable: boolean;
  isPickupAvailable: boolean;
  status: string;
  products: ProductResponseDto[];
}

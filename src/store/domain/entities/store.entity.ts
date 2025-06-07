import { Product } from './product.entity';

export class Vendor {
  id: string;
  userId: string;
  storeName: string;
  description: string;
  cnpj: string;
  openingHours: string;
  isDeliveryAvailable: boolean;
  isPickupAvailable: boolean;
  status: string;
  products: Product[];
}

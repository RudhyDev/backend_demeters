import { Product } from '../../domain/entities/product.entity';

export class ProductResponseDto implements Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice: number;
  category: string;
  unit: string;
  stock: number;
  isAvailable: boolean;
}

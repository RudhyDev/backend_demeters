import { Product } from '../../domain/entities/product.entity';
import { ProductResponseDto } from '../dtos/product-response.dto';

export class ProductAdapter {
  static toDto(product: Product): ProductResponseDto {
    return { ...product };
  }

  static toDtoList(products: Product[]): ProductResponseDto[] {
    return products.map((p) => this.toDto(p));
  }
}

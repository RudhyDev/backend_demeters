import { Product } from '../entities/product.entity';

// Token para injeção de dependência
export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByVendorId(vendorId: string): Promise<Product[]>;
  delete(id: string): Promise<void>;
  existsByNameAndVendor(name: string, vendorId: string): Promise<boolean>;
}
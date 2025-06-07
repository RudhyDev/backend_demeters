import { Vendor } from '../entities/store.entity';

// Token para injeção de dependência
export const VENDOR_REPOSITORY = 'VENDOR_REPOSITORY';

export interface VendorRepository {
  create(vendor: Vendor): Promise<Vendor>;
  update(id: string, vendor: Partial<Vendor>): Promise<Vendor>;
  findById(id: string): Promise<Vendor | null>;
  findByStoreName(storeName: string): Promise<Vendor | null>;
  findAll(): Promise<Vendor[]>;
  delete(id: string): Promise<void>;
  existsByStoreName(storeName: string): Promise<boolean>;
  existsByCnpj(cnpj: string): Promise<boolean>;
}

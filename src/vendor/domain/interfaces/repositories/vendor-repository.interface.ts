import { Vendor } from '../../entities/vendor.entity';

export interface IVendorRepository {
  create(vendor: Vendor): Promise<void>;
  findById(id: string): Promise<Vendor | null>;
  findByUserId(userId: string): Promise<Vendor | null>;
  findByStoreName(storeName: string): Promise<Vendor | null>;
  update(vendor: Vendor): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Vendor[]>;
}

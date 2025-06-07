import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma.service';
import { VendorRepository } from '../../domain/interfaces/store-repository.interface';
import { Vendor } from '../../domain/entities/store.entity';
import { VendorNotFoundException } from '../../domain/exceptions/vendor-not-found.exception';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

type VendorUpdateFields = Pick<
  Vendor,
  | 'storeName'
  | 'description'
  | 'cnpj'
  | 'openingHours'
  | 'isDeliveryAvailable'
  | 'isPickupAvailable'
  | 'status'
>;

@Injectable()
export class PrismaVendorRepository implements VendorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(vendor: Vendor): Promise<Vendor> {
    const {
      userId,
      storeName,
      description,
      cnpj,
      openingHours,
      isDeliveryAvailable,
      isPickupAvailable,
      status,
    } = vendor;

    // Verificar se o usuário existe antes de criar o vendor
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new UserNotFoundException(
        `Usuário com ID ${userId} não encontrado.`,
      );
    }

    const created = await this.prisma.vendor.create({
      data: {
        storeName,
        description,
        cnpj,
        openingHours,
        isDeliveryAvailable,
        isPickupAvailable,
        status,
        user: {
          connect: { id: userId },
        },
      },
      include: { products: true },
    });

    return this.mapToEntity(created);
  }

  async update(id: string, vendorData: Partial<Vendor>): Promise<Vendor> {
    await this.ensureVendorExists(id);

    const updateData = this.extractUpdateFields(vendorData);

    const updated = await this.prisma.vendor.update({
      where: { id },
      data: updateData,
      include: { products: true },
    });

    return this.mapToEntity(updated);
  }

  async findById(id: string): Promise<Vendor | null> {
    const vendor = await this.prisma.vendor.findUnique({
      where: { id },
      include: { products: true },
    });

    return vendor ? this.mapToEntity(vendor) : null;
  }

  async findByStoreName(storeName: string): Promise<Vendor | null> {
    const vendor = await this.prisma.vendor.findFirst({
      where: { storeName },
      include: { products: true },
    });

    return vendor ? this.mapToEntity(vendor) : null;
  }

  async findAll(): Promise<Vendor[]> {
    const vendors = await this.prisma.vendor.findMany({
      include: { products: true },
    });

    return vendors.map((vendor) => this.mapToEntity(vendor));
  }

  async delete(id: string): Promise<void> {
    await this.ensureVendorExists(id);
    await this.prisma.vendor.delete({ where: { id } });
  }

  async existsByStoreName(storeName: string): Promise<boolean> {
    const count = await this.prisma.vendor.count({
      where: { storeName },
    });

    return count > 0;
  }

  async existsByCnpj(cnpj: string): Promise<boolean> {
    const count = await this.prisma.vendor.count({
      where: { cnpj },
    });

    return count > 0;
  }

  private async ensureVendorExists(id: string): Promise<void> {
    const exists = await this.prisma.vendor.findUnique({ where: { id } });
    if (!exists) {
      throw new VendorNotFoundException(`Loja com ID ${id} não encontrada.`);
    }
  }

  private extractUpdateFields(
    vendor: Partial<Vendor>,
  ): Partial<VendorUpdateFields> {
    const updateData: Partial<VendorUpdateFields> = {};

    const updatableFields: Array<keyof VendorUpdateFields> = [
      'storeName',
      'description',
      'cnpj',
      'openingHours',
      'isDeliveryAvailable',
      'isPickupAvailable',
      'status',
    ];

    updatableFields.forEach((field) => {
      if (vendor[field] !== undefined) {
        updateData[field] = vendor[field] as any;
      }
    });

    return updateData;
  }

  private mapToEntity(prismaVendor: any): Vendor {
    return {
      id: prismaVendor.id,
      userId: prismaVendor.userId,
      storeName: prismaVendor.storeName,
      description: prismaVendor.description,
      cnpj: prismaVendor.cnpj,
      openingHours: prismaVendor.openingHours,
      isDeliveryAvailable: prismaVendor.isDeliveryAvailable,
      isPickupAvailable: prismaVendor.isPickupAvailable,
      status: prismaVendor.status,
      products: prismaVendor.products || [],
    };
  }
}

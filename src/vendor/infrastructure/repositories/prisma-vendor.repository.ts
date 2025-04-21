import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { Vendor } from '../../domain/entities/vendor.entity';
import { IVendorRepository } from '../../domain/interfaces/repositories/vendor-repository.interface';
import { randomUUID, UUID } from 'crypto';

@Injectable()
export class PrismaVendorRepository implements IVendorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(vendor: Vendor): Promise<void> {
    await this.prisma.vendor.create({
      data: {
        id: randomUUID(),
        userId: vendor.userId,
        storeName: vendor.storeName,
        description: vendor.description,
        cnpj: vendor.cnpj,
        openingHours: vendor.openingHours,
        isDeliveryAvailable: vendor.isDeliveryAvailable,
        isPickupAvailable: vendor.isPickupAvailable,
        status: vendor.status,
      },
    });
  }

  async findById(id: string): Promise<Vendor | null> {
    const data = await this.prisma.vendor.findUnique({ where: { id } });
    if (!data) return null;
    return this.toEntity(data);
  }

  async findByUserId(userId: string): Promise<Vendor | null> {
    const data = await this.prisma.vendor.findFirst({ where: { userId } });
    if (!data) return null;
    return this.toEntity(data);
  }

  async findByStoreName(storeName: string): Promise<Vendor | null> {
    const data = await this.prisma.vendor.findFirst({ where: { storeName } });
    if (!data) return null;
    return this.toEntity(data);
  }

  async update(vendor: Vendor): Promise<void> {
    await this.prisma.vendor.update({
      where: { id: vendor.id },
      data: {
        storeName: vendor.storeName,
        description: vendor.description,
        cnpj: vendor.cnpj,
        openingHours: vendor.openingHours,
        isDeliveryAvailable: vendor.isDeliveryAvailable,
        isPickupAvailable: vendor.isPickupAvailable,
        status: vendor.status,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendor.delete({ where: { id } });
  }

  async findAll(): Promise<Vendor[]> {
    const vendors = await this.prisma.vendor.findMany();
    return vendors.map((data) => this.toEntity(data));
  }

  private toEntity(data: any): Vendor {
    return new Vendor(
      data.id as UUID,
      data.userId as UUID,
      data.storeName,
      data.description,
      data.cnpj,
      data.openingHours,
      data.isDeliveryAvailable,
      data.isPickupAvailable,
      data.status,
      data.createdAt,
      data.updatedAt,
    );
  }
}

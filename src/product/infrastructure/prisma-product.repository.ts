import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/database/prisma.service';
import { Product } from '../domain/entities/product.entity';
import { PRODUCT_REPOSITORY, ProductRepository } from '../domain/interfaces/product-repository.interface';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const created = await this.prisma.product.create({
      data: {
        id: product.id,
        vendorId: product.vendorId,
        name: product.name,
        description: product.description,
        price: product.price,
        promotionalPrice: product.promotionalPrice,
        category: product.category,
        unit: product.unit,
        stock: product.stock,
        isAvailable: product.isAvailable,
      },
    });
    return this.mapToEntity(created);
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const updated = await this.prisma.product.update({
      where: { id },
      data,
    });
    return this.mapToEntity(updated);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product ? this.mapToEntity(product) : null;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map((p) => this.mapToEntity(p));
  }

  async findByVendorId(vendorId: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({ where: { vendorId } });
    return products.map((p) => this.mapToEntity(p));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  async existsByNameAndVendor(name: string, vendorId: string): Promise<boolean> {
    const count = await this.prisma.product.count({
      where: { name, vendorId },
    });
    return count > 0;
  }

  private mapToEntity(prismaProduct: any): Product {
    return {
      id: prismaProduct.id,
      vendorId: prismaProduct.vendorId,
      name: prismaProduct.name,
      description: prismaProduct.description,
      price: Number(prismaProduct.price),
      promotionalPrice: Number(prismaProduct.promotionalPrice),
      category: prismaProduct.category,
      unit: prismaProduct.unit,
      stock: prismaProduct.stock,
      isAvailable: prismaProduct.isAvailable,
    };
  }
}

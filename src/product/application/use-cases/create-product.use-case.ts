import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Product } from '../../domain/entities/product.entity';
import { PRODUCT_REPOSITORY, ProductRepository } from '../../domain/interfaces/product-repository.interface';
import { CreateProductDto } from '../dtos/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(input: CreateProductDto): Promise<Product> {
    const exists = await this.productRepository.existsByNameAndVendor(
      input.name,
      input.vendorId,
    );
    if (exists) {
      throw new Error('Este fornecedor já possui um produto com esse nome.');
    }

    const product: Product = {
      id: randomUUID(),
      vendorId: input.vendorId,
      name: input.name,
      description: input.description,
      price: input.price,
      promotionalPrice: input.promotionalPrice ?? 0,
      category: input.category,
      unit: input.unit,
      stock: input.stock,
      isAvailable: input.isAvailable,
    };

    return this.productRepository.create(product);
  }
}

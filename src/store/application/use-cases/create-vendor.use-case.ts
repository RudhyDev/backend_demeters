import { Inject, Injectable } from '@nestjs/common';
import { CreateVendorDto } from '../dtos/create-vendor.dto';
import { Vendor } from '../../domain/entities/store.entity';
import { VendorRepository, VENDOR_REPOSITORY } from '../../domain/interfaces/store-repository.interface';

@Injectable()
export class CreateVendorUseCase {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly vendorRepository: VendorRepository,
  ) {}

  async execute(input: CreateVendorDto): Promise<Vendor> {
    // Validação de duplicidade (storeName e cnpj)
    const existsByName = await this.vendorRepository.existsByStoreName(
      input.storeName,
    );
    if (existsByName) {
      throw new Error('Já existe uma loja com esse nome.');
    }
    const existsByCnpj = await this.vendorRepository.existsByCnpj(input.cnpj);
    if (existsByCnpj) {
      throw new Error('Já existe uma loja com esse CNPJ.');
    }
    const vendor: Vendor = {
      ...input,
      id: '', // será gerado pelo banco
      products: [],
    };
    return this.vendorRepository.create(vendor);
  }
}

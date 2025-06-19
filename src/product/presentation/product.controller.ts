import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateProductSwagger,
  FindAllProductsSwagger,
  FindProductByIdSwagger,
  UpdateProductSwagger,
  DeleteProductSwagger,
} from './utils/product.swagger';
import { CreateProductDto } from '../application/dtos/create-product.dto';
import { UpdateProductDto } from '../application/dtos/update-product.dto';
import { CreateProductUseCase } from '../application/use-cases/create-product.use-case';
import { FindProductByIdUseCase } from '../application/use-cases/find-product-by-id.use-case';
import { FindAllProductsUseCase } from '../application/use-cases/find-all-products.use-case';
import { UpdateProductUseCase } from '../application/use-cases/update-product.use-case';
import { DeleteProductUseCase } from '../application/use-cases/delete-product.use-case';
import { ProductAdapter } from '../application/adapters/product.adapter';
import { ProductResponseDto } from '../application/dtos/product-response.dto';
import { ProductNotFoundException } from '../domain/exceptions/product-not-found.exception';

@ApiTags('Produtos')
@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  @CreateProductSwagger()
  async create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.createProductUseCase.execute(dto);
    return ProductAdapter.toDto(product);
  }

  @Get()
  @FindAllProductsSwagger()
  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.findAllProductsUseCase.execute();
    return ProductAdapter.toDtoList(products);
  }

  @Get(':id')
  @FindProductByIdSwagger()
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    try {
      const product = await this.findProductByIdUseCase.execute(id);
      return ProductAdapter.toDto(product);
    } catch (error) {
      if (error instanceof ProductNotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Put(':id')
  @UpdateProductSwagger()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.updateProductUseCase.execute(id, dto);
    return ProductAdapter.toDto(product);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteProductSwagger()
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProductUseCase.execute(id);
  }
}

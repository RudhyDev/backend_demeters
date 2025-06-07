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
import { CreateVendorUseCase } from '../../application/use-cases/create-vendor.use-case';
import { UpdateVendorUseCase } from '../../application/use-cases/update-vendor.use-case';
import { FindVendorByIdUseCase } from '../../application/use-cases/find-vendor-by-id.use-case';
import { FindAllVendorsUseCase } from '../../application/use-cases/find-all-vendors.use-case';
import { DeleteVendorUseCase } from '../../application/use-cases/delete-vendor.use-case';
import { CreateVendorDto } from '../../application/dtos/create-vendor.dto';
import { UpdateVendorDto } from '../../application/dtos/update-vendor.dto';
import { VendorResponseDto } from '../../application/dtos/vendor-response.dto';
import { VendorAdapter } from '../../application/adapters/vendor.adapter';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import {
  CreateVendorSwagger,
  DeleteVendorSwagger,
  FindAllVendorsSwagger,
  FindVendorByIdSwagger,
  UpdateVendorSwagger,
} from '../utils/vendor.swagger';

@ApiTags('Lojas')
@Controller('vendors')
export class VendorController {
  constructor(
    private readonly createVendorUseCase: CreateVendorUseCase,
    private readonly updateVendorUseCase: UpdateVendorUseCase,
    private readonly findVendorByIdUseCase: FindVendorByIdUseCase,
    private readonly findAllVendorsUseCase: FindAllVendorsUseCase,
    private readonly deleteVendorUseCase: DeleteVendorUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @CreateVendorSwagger()
  async create(
    @Body() createVendorDto: CreateVendorDto,
  ): Promise<VendorResponseDto> {
    try {
      const vendor = await this.createVendorUseCase.execute(createVendorDto);
      return VendorAdapter.toDto(vendor);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Get()
  @FindAllVendorsSwagger()
  async findAll(): Promise<VendorResponseDto[]> {
    const vendors = await this.findAllVendorsUseCase.execute();
    return VendorAdapter.toDtoList(vendors);
  }

  @Get(':id')
  @FindVendorByIdSwagger()
  async findOne(@Param('id') id: string): Promise<VendorResponseDto> {
    const vendor = await this.findVendorByIdUseCase.execute(id);
    return VendorAdapter.toDto(vendor);
  }

  @Put(':id')
  @UpdateVendorSwagger()
  async update(
    @Param('id') id: string,
    @Body() updateVendorDto: UpdateVendorDto,
  ): Promise<VendorResponseDto> {
    const vendor = await this.updateVendorUseCase.execute(id, updateVendorDto);
    return VendorAdapter.toDto(vendor);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteVendorSwagger()
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteVendorUseCase.execute(id);
  }
}

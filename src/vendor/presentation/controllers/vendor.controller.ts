import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RegisterVendorDto } from '../../application/dtos/register-vendor.dto';
import { UpdateVendorDto } from '../../application/dtos/update-vendor.dto';
import { RegisterVendorUseCase } from '../../application/use-cases/register-vendor.use-case';
import { UpdateVendorUseCase } from '../../application/use-cases/update-vendor.use-case';
import { FindVendorUseCase } from '../../application/use-cases/find-vendor.use-case';
import { DeleteVendorUseCase } from '../../application/use-cases/delete-vendor.use-case';
import { 
  RegisterVendorSwagger,
  UpdateVendorSwagger,
  FindVendorByIdSwagger,
  FindVendorByUserIdSwagger,
  FindVendorByStoreNameSwagger,
  FindAllVendorsSwagger,
  DeleteVendorSwagger
} from '../utils/vendor.swagger';

@Controller('vendors')
export class VendorController {
  constructor(
    private readonly registerVendorUseCase: RegisterVendorUseCase,
    private readonly updateVendorUseCase: UpdateVendorUseCase,
    private readonly findVendorUseCase: FindVendorUseCase,
    private readonly deleteVendorUseCase: DeleteVendorUseCase,
  ) {}

  @RegisterVendorSwagger()
  @Post('register')
  async register(@Body() dto: RegisterVendorDto) {
    return await this.registerVendorUseCase.execute(dto);
  }

  @UpdateVendorSwagger()
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateVendorDto) {
    return await this.updateVendorUseCase.execute(id, dto);
  }

  @FindVendorByIdSwagger()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.findVendorUseCase.byId(id);
  }

  @FindVendorByUserIdSwagger()
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return await this.findVendorUseCase.byUserId(userId);
  }

  @FindVendorByStoreNameSwagger()
  @Get('store/:storeName')
  async findByStoreName(@Param('storeName') storeName: string) {
    return await this.findVendorUseCase.byStoreName(storeName);
  }

  @FindAllVendorsSwagger()
  @Get()
  async findAll() {
    return await this.findVendorUseCase.all();
  }

  @DeleteVendorSwagger()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deleteVendorUseCase.execute(id);
  }
}

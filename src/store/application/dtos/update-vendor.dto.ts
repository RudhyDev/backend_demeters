import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateVendorDto {
  @IsOptional()
  @IsString()
  storeName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  openingHours?: string;

  @IsOptional()
  @IsBoolean()
  isDeliveryAvailable?: boolean;

  @IsOptional()
  @IsBoolean()
  isPickupAvailable?: boolean;

  @IsOptional()
  @IsString()
  status?: string;
}

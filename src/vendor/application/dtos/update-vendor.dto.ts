import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateVendorDto {
  @IsString()
  @IsOptional()
  storeName?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  cnpj?: string;

  @IsString()
  @IsOptional()
  openingHours?: string;

  @IsBoolean()
  @IsOptional()
  isDeliveryAvailable?: boolean;

  @IsBoolean()
  @IsOptional()
  isPickupAvailable?: boolean;

  @IsString()
  @IsOptional()
  status?: string;
}

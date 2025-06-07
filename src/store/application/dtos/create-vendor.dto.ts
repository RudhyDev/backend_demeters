import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateVendorDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  storeName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  cnpj: string;

  @IsNotEmpty()
  @IsString()
  openingHours: string;

  @IsNotEmpty()
  @IsBoolean()
  isDeliveryAvailable: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isPickupAvailable: boolean;

  @IsNotEmpty()
  @IsString()
  status: string;
}

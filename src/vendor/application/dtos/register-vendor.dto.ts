import { IsString, IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class RegisterVendorDto {
  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  storeName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  openingHours: string;

  @IsBoolean()
  isDeliveryAvailable: boolean;

  @IsBoolean()
  isPickupAvailable: boolean;
}

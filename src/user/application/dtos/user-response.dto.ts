import { UUID } from 'crypto';
import { Address } from '../../domain/entities/address.entity';

export class UserResponseDto {
  id: UUID;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  addresses: Address[];
}

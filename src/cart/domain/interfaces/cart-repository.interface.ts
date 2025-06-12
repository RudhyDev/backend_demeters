import { Cart } from '../entities/cart.entity';

export interface CartRepository {
  create(cart: Cart): Promise<Cart>;
  findById(id: string): Promise<Cart | null>;
  findByUserId(userId: string): Promise<Cart | null>;
  update(cart: Cart): Promise<Cart>;
  delete(id: string): Promise<void>;
}

import { CartItem } from './cart-item.entity';

export class Cart {
  id: string;
  userId: string;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  items: CartItem[];

  constructor(
    id: string,
    userId: string,
    total: number,
    status: string,
    createdAt: Date,
    updatedAt: Date,
    items: CartItem[] = [],
  ) {
    this.id = id;
    this.userId = userId;
    this.total = total;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.items = items;
  }

  addItem(item: CartItem): void {
    const existingItemIndex = this.items.findIndex(
      (i) => i.productId === item.productId,
    );

    if (existingItemIndex >= 0) {
      this.items[existingItemIndex].quantity += item.quantity;
    } else {
      this.items.push(item);
    }

    this.recalculateTotal();
  }

  removeItem(productId: string): void {
    this.items = this.items.filter((item) => item.productId !== productId);
    this.recalculateTotal();
  }

  updateItemQuantity(productId: string, quantity: number): void {
    const itemIndex = this.items.findIndex(
      (item) => item.productId === productId,
    );

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.items[itemIndex].quantity = quantity;
        this.recalculateTotal();
      }
    }
  }

  recalculateTotal(): void {
    this.total = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  clearCart(): void {
    this.items = [];
    this.total = 0;
  }
}

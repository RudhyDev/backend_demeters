export class CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;

  constructor(
    id: string,
    cartId: string,
    productId: string,
    quantity: number,
    price: number,
  ) {
    this.id = id;
    this.cartId = cartId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

export class ProductNotAvailableException extends Error {
  constructor(productId: string) {
    super(`Produto com ID ${productId} não está disponível`);
    this.name = 'ProductNotAvailableException';
  }
}

export class ProductNotFoundException extends Error {
  constructor(productId: string) {
    super(`Produto com ID ${productId} não encontrado.`);
    this.name = 'ProductNotFoundException';
  }
}

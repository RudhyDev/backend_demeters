export class CartNotFoundException extends Error {
  constructor(id: string) {
    super(`Carrinho com ID ${id} não encontrado`);
    this.name = 'CartNotFoundException';
  }
}

export class VendorNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VendorNotFoundException';
  }
}

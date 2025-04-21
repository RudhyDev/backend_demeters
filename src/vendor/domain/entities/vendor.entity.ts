import { UUID } from 'crypto';

export class Vendor {
  constructor(
    public readonly id: UUID,
    public readonly userId: UUID,
    private _storeName: string,
    private _description: string,
    private _cnpj: string,
    private _openingHours: string,
    private _isDeliveryAvailable: boolean,
    private _isPickupAvailable: boolean,
    private _status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  get storeName(): string {
    return this._storeName;
  }

  get description(): string {
    return this._description;
  }

  get cnpj(): string {
    return this._cnpj;
  }

  get openingHours(): string {
    return this._openingHours;
  }

  get isDeliveryAvailable(): boolean {
    return this._isDeliveryAvailable;
  }

  get isPickupAvailable(): boolean {
    return this._isPickupAvailable;
  }

  get status(): string {
    return this._status;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      storeName: this._storeName,
      description: this._description,
      cnpj: this._cnpj,
      openingHours: this._openingHours,
      isDeliveryAvailable: this._isDeliveryAvailable,
      isPickupAvailable: this._isPickupAvailable,
      status: this._status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

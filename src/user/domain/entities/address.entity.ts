import { UUID } from 'crypto';

export class Address {
  constructor(
    public readonly id: UUID,
    private _userId: UUID,
    private _street: string,
    private _number: string,
    private _complement: string,
    private _neighborhood: string,
    private _city: string,
    private _state: string,
    private _zipCode: string,
    private _isDefault: boolean,
  ) {}

  get userId(): UUID {
    return this._userId;
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get complement(): string {
    return this._complement;
  }

  get neighborhood(): string {
    return this._neighborhood;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get isDefault(): boolean {
    return this._isDefault;
  }

  updateAddress(
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string,
  ): void {
    this._street = street;
    this._number = number;
    this._complement = complement;
    this._neighborhood = neighborhood;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
  }

  setAsDefault(isDefault: boolean): void {
    this._isDefault = isDefault;
  }

  getFullAddress(): string {
    return `${this._street}, ${this._number}${this._complement ? `, ${this._complement}` : ''} - ${this._neighborhood}, ${this._city}/${this._state} - CEP: ${this._zipCode}`;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this._userId,
      street: this._street,
      number: this._number,
      complement: this._complement,
      neighborhood: this._neighborhood,
      city: this._city,
      state: this._state,
      zipCode: this._zipCode,
      isDefault: this._isDefault,
      fullAddress: this.getFullAddress()
    };
  }
}

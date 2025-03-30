import { UUID } from 'crypto';
import { Address } from './address.entity';

export class User {
  constructor(
    public readonly id: UUID,
    private _name: string,
    private _email: string,
    private _password: string,
    private _phone: string,
    public readonly createdAt: Date,
    public _updatedAt: Date,
    private _addresses: Address[] = [],
  ) {}

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get phone(): string {
    return this._phone;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get addresses(): Address[] {
    return [...this._addresses];
  }

  //! ------- métodos da regra de negócio -------
  updateProfile(name: string, phone: string): void {
    this._name = name;
    this._phone = phone;
    this._updatedAt = new Date();
  }

  changeEmail(email: string): void {
    this._email = email;
    this._updatedAt = new Date();
  }

  changePassword(password: string): void {
    this._password = password;
    this._updatedAt = new Date();
  }

  addAddress(address: Address): void {
    this._addresses.push(address);
    this._updatedAt = new Date();
  }

  updateAddress(addressId: UUID, address: Address): void {
    const index = this._addresses.findIndex(address => address.id === addressId);
    this._addresses[index] = address;
    this._updatedAt = new Date();
  }

  removeAddress(addressId: UUID): void {
    this._addresses = this._addresses.filter(address => address.id !== addressId);
    this._updatedAt = new Date();
  }
}

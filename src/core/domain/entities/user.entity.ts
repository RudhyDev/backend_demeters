import { AggregateRoot } from '../base/aggregate-root';

export class User extends AggregateRoot {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public phone: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {
    super();
  }

  static create(name: string, email: string, password: string, phone: string): User {
    return new User(crypto.randomUUID(), name, email, password, phone, new Date(), new Date());
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

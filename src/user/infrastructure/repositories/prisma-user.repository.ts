import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { PrismaService } from 'src/infra/database/prisma.service';
import { Address } from 'src/user/domain/entities/address.entity';
import { User } from 'src/user/domain/entities/user.entity';
import { IUserRepository } from 'src/user/domain/interfaces/repositories/user-repository.interface';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        addresses: {
          create: user.addresses,
        },
      },
    });
  }

  async findById(id: UUID): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id },
      include: { addresses: true },
    });

    if (!userData) return null;

    return new User(
      userData.id as UUID,
      userData.name,
      userData.email,
      userData.password,
      userData.phone,
      userData.createdAt,
      userData.updatedAt,
      userData.addresses.map(
        address =>
          new Address(
            address.id as UUID,
            address.userId as UUID,
            address.street,
            address.number,
            address.complement,
            address.neighborhood,
            address.city,
            address.state,
            address.zipCode,
            address.isDefault,
          ),
      ),
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: { addresses: true },
    });

    return users.map(
      user =>
        new User(
          user.id as UUID,
          user.name,
          user.email,
          user.password,
          user.phone,
          user.createdAt,
          user.updatedAt,
          user.addresses.map(
            address =>
              new Address(
                address.id as UUID,
                address.userId as UUID,
                address.street,
                address.number,
                address.complement,
                address.neighborhood,
                address.city,
                address.state,
                address.zipCode,
                address.isDefault,
              ),
          ),
        ),
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email },
      include: { addresses: true },
    });

    if (!userData) return null;

    return new User(
      userData.id as UUID,
      userData.name,
      userData.email,
      userData.password,
      userData.phone,
      userData.createdAt,
      userData.updatedAt,
      userData.addresses.map(
        address =>
          new Address(
            address.id as UUID,
            address.userId as UUID,
            address.street,
            address.number,
            address.complement,
            address.neighborhood,
            address.city,
            address.state,
            address.zipCode,
            address.isDefault,
          ),
      ),
    );
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        updatedAt: user.updatedAt,
        addresses: {
          deleteMany: {},
          create: user.addresses,
        },
      },
    });
  }

  async delete(id: UUID): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}

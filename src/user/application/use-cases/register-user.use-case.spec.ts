import { RegisterUserUseCase } from './register-user.use-case';
import { IUserRepository } from '../../domain/interfaces/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { randomUUID } from 'crypto';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

import * as bcrypt from 'bcrypt';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    useCase = new RegisterUserUseCase(userRepository);
  });

  it('should register a new user', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as never);

    const input = {
      name: 'John',
      email: 'john@example.com',
      password: '123456',
      phone: '123',
    };

    const result = await useCase.execute(input);

    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 5);
    expect(userRepository.create).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });

  it('should throw if email already exists', async () => {
    userRepository.findByEmail.mockResolvedValue({} as User);

    await expect(
      useCase.execute({ name: '', email: 'test', password: '', phone: '' }),
    ).rejects.toThrow('Usuário com este email já existe');
  });
});

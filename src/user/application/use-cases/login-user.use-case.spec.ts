import { LoginUserUseCase } from './login-user.use-case';
import { IUserRepository } from '../../domain/interfaces/repositories/user-repository.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../domain/entities/user.entity';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('LoginUserUseCase', () => {
  let useCase: LoginUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    jwtService = {
      sign: jest.fn(),
    } as unknown as jest.Mocked<JwtService>;

    useCase = new LoginUserUseCase(userRepository, jwtService);
  });

  it('should login a user and return a token', async () => {
    const user = new User(
      randomUUID() as any,
      'John',
      'john@example.com',
      'hashedPassword',
      '123456',
      new Date(),
      new Date(),
    );

    userRepository.findByEmail.mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
    jwtService.sign.mockReturnValue('token');

    const result = await useCase.execute('john@example.com', 'plain');

    expect(bcrypt.compare).toHaveBeenCalledWith('plain', 'hashedPassword');
    expect(jwtService.sign).toHaveBeenCalledWith({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    expect(result).toEqual({ token: 'token' });
  });

  it('should throw when credentials are invalid', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    await expect(useCase.execute('no@mail.com', '123')).rejects.toThrow('Credenciais inválidas');
  });
});

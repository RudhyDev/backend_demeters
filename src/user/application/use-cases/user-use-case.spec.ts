import { UserUseCase } from './user-use-case';
import { IUserRepository } from '../../domain/interfaces/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { randomUUID } from 'crypto';

describe('UserUseCase', () => {
  let useCase: UserUseCase;
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

    useCase = new UserUseCase(userRepository);
  });

  it('should return all users', async () => {
    const users = [
      new User(randomUUID() as any, 'John', 'john@example.com', 'pwd', '123', new Date(), new Date()),
    ];
    userRepository.findAll.mockResolvedValue(users);

    const result = await useCase.findAll();

    expect(result).toEqual(users);
    expect(userRepository.findAll).toHaveBeenCalled();
  });
});

import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserController } from './user.controller';
import { LoginUserUseCase } from 'src/user/application/use-cases/login-user.use-case';
import { RegisterUserUseCase } from 'src/user/application/use-cases/register-user.use-case';
import { UserUseCase } from 'src/user/application/use-cases/user-use-case';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UserAdapter } from '../../application/adapters/user.adapter';
import { User } from '../../domain/entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let registerUseCase: jest.Mocked<RegisterUserUseCase>;
  let loginUseCase: jest.Mocked<LoginUserUseCase>;
  let userUseCase: jest.Mocked<UserUseCase>;

  beforeEach(() => {
    registerUseCase = { execute: jest.fn() } as any;
    loginUseCase = { execute: jest.fn() } as any;
    userUseCase = { findAll: jest.fn() } as any;

    controller = new UserController(registerUseCase, loginUseCase, userUseCase);
  });

  describe('register', () => {
    it('should return created user id', async () => {
      const dto: RegisterUserDto = {
        name: 'John',
        email: 'john@example.com',
        password: '12345678',
        phone: '999999',
      };
      const result = { id: 'uuid' as any };
      registerUseCase.execute.mockResolvedValue(result);

      await expect(controller.register(dto)).resolves.toEqual(result);
      expect(registerUseCase.execute).toHaveBeenCalledWith(dto);
    });

    it('should throw ConflictException when email exists', async () => {
      registerUseCase.execute.mockRejectedValue(new Error('Usuário com este email já existe'));
      const dto = { name: '', email: '', password: '', phone: '' } as RegisterUserDto;

      await expect(controller.register(dto)).rejects.toBeInstanceOf(ConflictException);
    });

    it('should throw InternalServerErrorException on other errors', async () => {
      registerUseCase.execute.mockRejectedValue(new Error('unexpected'));
      const dto = { name: '', email: '', password: '', phone: '' } as RegisterUserDto;

      await expect(controller.register(dto)).rejects.toBeInstanceOf(InternalServerErrorException);
    });
  });

  describe('login', () => {
    it('should return token on success', async () => {
      const dto: LoginUserDto = { email: 'john@example.com', password: 'secret' };
      loginUseCase.execute.mockResolvedValue({ token: 'jwt' });

      await expect(controller.login(dto)).resolves.toEqual({ token: 'jwt' });
      expect(loginUseCase.execute).toHaveBeenCalledWith(dto.email, dto.password);
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      loginUseCase.execute.mockRejectedValue(new Error('Credenciais inválidas'));
      const dto = { email: '', password: '' } as LoginUserDto;

      await expect(controller.login(dto)).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('should throw InternalServerErrorException on other errors', async () => {
      loginUseCase.execute.mockRejectedValue(new Error('db down'));
      const dto = { email: '', password: '' } as LoginUserDto;

      await expect(controller.login(dto)).rejects.toBeInstanceOf(InternalServerErrorException);
    });
  });

  describe('findAll', () => {
    it('should return list of users as DTOs', async () => {
      const users: User[] = [{ id: '1', name: 'User1', email: 'user1@example.com' } as any, { id: '2', name: 'User2', email: 'user2@example.com' } as any];
      const userDtos = UserAdapter.toDtoList(users);
      
      jest.spyOn(UserAdapter, 'toDtoList').mockReturnValue(userDtos);
      userUseCase.findAll.mockResolvedValue(users);

      await expect(controller.findAll()).resolves.toEqual(userDtos);
      expect(userUseCase.findAll).toHaveBeenCalled();
      expect(UserAdapter.toDtoList).toHaveBeenCalledWith(users);
    });

    it('should throw InternalServerErrorException on error', async () => {
      userUseCase.findAll.mockRejectedValue(new Error('fail'));

      await expect(controller.findAll()).rejects.toBeInstanceOf(InternalServerErrorException);
    });
  });
});

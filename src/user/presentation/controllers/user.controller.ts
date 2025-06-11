import {
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { UserAdapter } from '../../application/adapters/user.adapter';
import { UserResponseDto } from '../../application/dtos/user-response.dto';
import { LoginUserUseCase } from 'src/user/application/use-cases/login-user.use-case';
import { RegisterUserUseCase } from 'src/user/application/use-cases/register-user.use-case';
import { UserUseCase } from 'src/user/application/use-cases/user-use-case';
import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LoginUserSwagger, RegisterUserSwagger } from '../utils/user.swagger';

@Controller('users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly userUseCase: UserUseCase,
  ) {}

  @RegisterUserSwagger()
  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<{ id: UUID }> {
    try {
      const result = await this.registerUserUseCase.execute(registerUserDto);
      return { id: result.id };
    } catch (error) {
      if (error.message === 'Usuário com este email já existe') {
        throw new ConflictException('Usuário com este email já existe');
      }
      throw new InternalServerErrorException('Erro ao registrar usuário');
    }
  }

  @LoginUserSwagger()
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    try {
      return await this.loginUserUseCase.execute(
        loginUserDto.email,
        loginUserDto.password,
      );
    } catch (error) {
      if (error.message === 'Credenciais inválidas') {
        throw new UnauthorizedException('Credenciais inválidas');
      }
      throw new InternalServerErrorException('Erro ao realizar login');
    }
  }

  @Get('all')
  async findAll(): Promise<UserResponseDto[]> {
    try {
      const users = await this.userUseCase.findAll();
      return UserAdapter.toDtoList(users);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar usuários');
    }
  }
}

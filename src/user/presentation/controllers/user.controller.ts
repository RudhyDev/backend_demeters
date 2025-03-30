import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { LoginUserUseCase } from 'src/user/application/use-cases/login-user.use-case';
import { RegisterUserUseCase } from 'src/user/application/use-cases/register-user.use-case';
import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto): Promise<{ id: UUID }> {
    try {
      const user = await this.registerUserUseCase.execute(registerUserDto);

      return user;
    } catch (error) {
      if (error.message === 'Usuário com este email já existe') {
        throw new ConflictException('Usuário com este email já existe');
      }
      throw new InternalServerErrorException('Erro ao registrar usuário');
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    try {
      return await this.loginUserUseCase.execute(loginUserDto.email, loginUserDto.password);
    } catch (error) {
      if (error.message === 'Credenciais inválidas') {
        throw new UnauthorizedException('Credenciais inválidas');
      }
      throw new InternalServerErrorException('Erro ao realizar login');
    }
  }
}

import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';

export function RegisterUserSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Registrar usuário', description: 'Cria um novo usuário', operationId: 'registerUser' }),
    ApiBody({
      type: RegisterUserDto,
      examples: {
        RegisterUserDto: {
          value: { name: 'John Doe', email: 'john@example.com', password: 'password123', phone: '(11) 99999-9999' },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Usuário registrado com sucesso',
      schema: { example: { id: '63613c08-0cca-49d6-a959-1c9ffa8c1816' } },
    }),
    ApiResponse({ status: 409, description: 'Usuário com este email já existe' }),
    ApiResponse({ status: 500, description: 'Erro ao registrar usuário' }),
  );
}

export function LoginUserSwagger() {
  return applyDecorators(
    ApiOperation({ summary: 'Login do usuário', description: 'Autentica um usuário', operationId: 'loginUser' }),
    ApiBody({
      type: LoginUserDto,
      examples: {
        LoginUserDto: {
          value: { email: 'john@example.com', password: 'password123' },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Login realizado com sucesso',
      schema: {
        example: {
          token:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDM5NTA1MTQsImV4cCI6MTc3NTQ4NjUxNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.FfATKRDBWLWkZ9joJ66s2oSwpThOHGGZZrFpaznVXhE',
        },
      },
    }),
    ApiResponse({ status: 401, description: 'Credenciais inválidas' }),
    ApiResponse({ status: 500, description: 'Erro ao realizar login' }),
  );
}

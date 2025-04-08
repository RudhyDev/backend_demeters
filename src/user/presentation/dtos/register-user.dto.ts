import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    name: 'name',
    description: 'Nome do usuário',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'email',
    description: 'Email do usuário',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'Senha do usuário',
    example: '12345678',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    name: 'cellphone',
    description: 'Telefone do usuário',
    example: '(11) 99999-9999',
  })
  @IsNotEmpty()
  phone: string;
}

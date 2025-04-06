import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'O email do usuário',
    example: 'usuario@exemplo.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'senha123',
  })
  @IsNotEmpty()
  password: string;
}